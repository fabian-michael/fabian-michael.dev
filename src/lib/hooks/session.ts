import { dev } from '$app/environment';
import { makePayloadRequest } from '$lib/utils/payload';
import { safePromise } from '$lib/utils/safePromise';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { decodeJwt } from 'jose';
import { setFlash } from 'sveltekit-flash-message/server';

type JWT_PAYLOAD = {
    id: string;
    email: string;
    collection: string;
    iat: number;
    exp: number;
}

const PAYLOAD_REFRESH_TOKEN_SLUG = '/api/frontend-users/refresh-token';

export const session: Handle = async ({ event, resolve }) => {
    if (!event.locals.session) {
        event.locals.session = {};
    }

    let token = event.cookies.get('token');
    if (token) {
        const jwt = decodeJwt<JWT_PAYLOAD>(token);

        if (jwt.exp * 1000 < Date.now()) {
            handleExpiredToken(event);
            return resolve(event);
        }

        token = await refreshToken({ token, event });
        event.locals.session.user = {
            email: jwt.email,
        };
        event.locals.session.userToken = token;
    }

    return resolve(event);
};

function handleExpiredToken(event: RequestEvent) {
    setFlash({
        title: 'Session Expired',
        message: 'Your session has expired. Please log in again.',
        type: 'info',
    }, event);
    event.cookies.delete('token', { path: '/' });
    event.cookies.delete('remember_user', { path: '/' });
}

async function refreshToken({ token, event }: { token: string, event: RequestEvent }): Promise<string> {
    const rememberUser = Boolean(event.cookies.get('remember_user'));
    const jwt = decodeJwt<JWT_PAYLOAD>(token);

    if (jwt.exp * 1000 - Date.now() < 10 * 60 * 1000) {
        const [response, err] = await safePromise(
            makePayloadRequest<Payload.Auth.RefreshTokenResponse>({
                slug: PAYLOAD_REFRESH_TOKEN_SLUG,
                token,
                fetch: event.fetch,
                init: {
                    method: 'POST',
                },
            }),
            {
                errorMessage: 'Failed to refresh token',
            }
        );

        if (!err) {
            token = response.refreshedToken;
            event.cookies.set('token', token, {
                path: '/',
                httpOnly: true,
                secure: !dev,
                maxAge: rememberUser
                    ? 14 * 24 * 60 * 60 // 14 days
                    : undefined,
            });

            if (rememberUser) {
                event.cookies.set('remember_user', '1', {
                    path: '/',
                    httpOnly: false,
                    secure: !dev,
                    maxAge: 14 * 24 * 60 * 60, // 14 days
                });
            }

        }
    }

    return token;
}
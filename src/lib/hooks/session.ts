import type { Handle } from '@sveltejs/kit';
import { decodeJwt } from 'jose';

type JWT_PAYLOAD = {
    id: string;
    email: string;
}

export const session: Handle = ({ event, resolve }) => {
    if (!event.locals.session) {
        event.locals.session = {};
    }

    const token = event.cookies.get('user');
    if (token) {
        const jwt = decodeJwt<JWT_PAYLOAD>(token);
        event.locals.session.user = {
            email: jwt.email,
        };
        event.locals.session.userToken = token;
    }

    return resolve(event);
};
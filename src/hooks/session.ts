import { getSession, setSessionCookie, updateSessionExpiry } from '$lib/server/session';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

export const session: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');
	if (!sessionId) {
		return resolve(event);
	}

	const userSession = await getSession(sessionId);
	if (!userSession) {
		handleExpiredToken(event);
		return resolve(event);
	}

	updateSessionExpiry(sessionId);
	setSessionCookie(event, sessionId);

	event.locals.session = userSession;
	return resolve(event);
};

function handleExpiredToken(event: RequestEvent) {
	setFlash(
		{
			title: 'Session Expired',
			message: 'Your session has expired. Please log in again.',
			type: 'info',
		},
		event,
	);
	event.cookies.delete('session', { path: '/' });
}

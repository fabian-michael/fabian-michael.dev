import { dev } from '$app/environment';
import type { RequestEvent } from '@sveltejs/kit';
import { kv } from './kv';

const SESSION_EXPIRES_DEV = 60 * 60; // 1 hour
const SESSION_EXPIRES_PROD = 30 * 24 * 60 * 60; // 30 days

export const getSession = (sessionId: string) => kv.get<App.Session>(sessionId);

export const setSession = (sessionId: string, session: App.Session) =>
	kv.set(sessionId, session, {
		ex: dev ? SESSION_EXPIRES_DEV : SESSION_EXPIRES_PROD,
		nx: true, // only set if not exists
	});

export const updateSession = (sessionId: string, session: App.Session) =>
	kv.set(sessionId, session, {
		ex: dev ? SESSION_EXPIRES_DEV : SESSION_EXPIRES_PROD,
		xx: true, // only set if exists
	});

export const updateSessionExpiry = (sessionId: string) =>
	kv.expire(sessionId, dev ? SESSION_EXPIRES_DEV : SESSION_EXPIRES_PROD);

export const deleteSession = (sessionId: string) => kv.del(sessionId);

export const newSession = (): App.Session => ({
	id: crypto.randomUUID(),
});

export const setSessionCookie = (event: RequestEvent, sessionId: string) => {
	event.cookies.set('session', sessionId, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		maxAge: dev ? SESSION_EXPIRES_DEV : SESSION_EXPIRES_PROD,
	});
};

export const deleteSessionCookie = (event: RequestEvent) => {
	event.cookies.set('session', '', {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		maxAge: -1,
	});
};

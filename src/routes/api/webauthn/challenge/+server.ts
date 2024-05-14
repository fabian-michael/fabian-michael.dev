import { newSession, setSession, setSessionCookie, updateSession } from '$lib/server/session';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
    let session = event.locals.session;
    const challenge = crypto.randomUUID();

    if (!session) {
        session = newSession();
        session.challenge = challenge;
        await setSession(session.id, session);
    } else {
        session.challenge = challenge;
        await updateSession(session.id, session);
    }

    setSessionCookie(event, session.id);

    return new Response(JSON.stringify({
        challenge: session.challenge,
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}; 
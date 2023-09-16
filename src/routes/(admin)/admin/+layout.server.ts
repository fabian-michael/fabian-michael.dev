import { PUBLIC_ADMIN_EMAIL } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ locals: { getSession }, url, }) => {
    const session = await getSession();
    const redirectTo = url.pathname;

    if (!session) {
        throw redirect(303, '/auth/login?redirectTo=' + redirectTo);
    }

    if (session.user.email !== PUBLIC_ADMIN_EMAIL) {
        throw error(403, 'Forbidden');
    }
};
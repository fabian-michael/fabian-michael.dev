import { error, redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ url }) => {
    const session = null; // TODO
    const redirectTo = url.pathname;

    if (!session) {
        redirect(303, '/auth/login?redirectTo=' + redirectTo);
    }

    const isAdmin = false;

    if (!isAdmin) {
        error(403, 'Forbidden');
    }
};
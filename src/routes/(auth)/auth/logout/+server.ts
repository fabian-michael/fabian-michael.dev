import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals, cookies }) => {
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (locals.session?.user) {
        cookies.delete('token', { path: '/' });
        cookies.delete('remember_user', { path: '/' });
        delete locals.session.user;
    }

    redirect(303, redirectTo);
};
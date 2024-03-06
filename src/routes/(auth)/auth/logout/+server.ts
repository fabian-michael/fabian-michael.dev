import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
    const session = locals.session;
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (session?.user) {
        // TODO logout
    }

    redirect(303, redirectTo);
};
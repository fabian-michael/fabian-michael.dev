import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
    const session = null; // TODO
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (session) {
        // TODO
    }

    redirect(303, redirectTo);
};
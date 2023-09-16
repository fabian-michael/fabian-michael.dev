import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
    const session = await locals.getSession();
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (session) {
        await locals.supabase.auth.signOut();
    }

    throw redirect(303, redirectTo);
};
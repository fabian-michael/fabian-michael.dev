import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
    const code = url.searchParams.get('code');
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (code) {
        // TODO
    }

    redirect(303, redirectTo);
}
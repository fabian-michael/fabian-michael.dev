import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
    const session = await getSession();
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (session) {
        throw redirect(303, redirectTo);
    }

    return {
        url: url.origin,
        redirectTo
    };
}
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;
export const csr = true;

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = null;
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (session) {
        redirect(303, redirectTo);
    }

    return {
        url: url.origin,
        redirectTo,
    };
}
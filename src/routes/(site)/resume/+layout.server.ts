import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const config = {
    isr: false,
}

export const load = async ({ locals }) => {
    const session = null;

    if (!session) {
        throw redirect(303, '/auth/login?redirectTo=/resume');
    }
}
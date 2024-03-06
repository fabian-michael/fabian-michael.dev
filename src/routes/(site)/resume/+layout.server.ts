import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const config = {
    isr: false,
};

export const load = async ({ locals }) => {
    const session = locals.session;

    if (!session?.user) {
        throw redirect(303, '/auth/login?redirectTo=/resume');
    }
};
import { sleep } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { schema } from './schema';

export const ssr = false;
export const csr = true;

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = null;
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (session) {
        redirect(303, redirectTo);
    }

    const loginForm = await superValidate(zod(schema));

    return {
        loginForm,
        url: url.origin,
        redirectTo,
    };
}

export const actions: Actions = {
    default: async (event) => {
        const { request } = event;
        const form = await superValidate(request, zod(schema));

        if (!form.valid) {
            return fail(400, { form });
        }

        // TODO: login
        await sleep(500);

        setFlash({
            title: 'Failed to login',
            message: 'Login is not implemented yet',
            type: 'error',
        }, event);

        return error(501);
    }
};
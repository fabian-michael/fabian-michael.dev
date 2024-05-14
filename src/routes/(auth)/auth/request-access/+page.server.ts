import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { schemaServer } from './schema-server';

export const ssr = false;
export const csr = true;

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = locals.session;
    const redirectTo = url.searchParams.get('redirectTo') || '/';

    if (session?.user) {
        redirect(303, redirectTo);
    }

    const requestAccessForm = await superValidate(zod(schemaServer));

    return {
        requestAccessForm,
        url: url.origin,
        redirectTo,
    };
};

const PAYLOAD_SLUG = ''; // TODO 

export const actions: Actions = {
    default: async (event) => {
        const { request, fetch, cookies } = event;
        const form = await superValidate(request, zod(schemaServer));

        if (!form.valid) {
            return fail(400, { form });
        }

        console.dir(form.data);

        return {
            form,
        };
    },
};
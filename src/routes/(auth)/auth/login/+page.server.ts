import { dev } from '$app/environment';
import { makePayloadRequest } from '$lib/utils/payload';
import { safePromise } from '$lib/utils/safePromise';
import { error, fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { schema } from './schema';

export const ssr = false;
export const csr = true;

export const load: PageServerLoad = async ({ url, locals }) => {
	const session = locals.session;
	const redirectTo = url.searchParams.get('redirectTo') || '/';

	if (session?.user) {
		redirect(303, redirectTo);
	}

	const loginForm = await superValidate(zod(schema));

	return {
		loginForm,
		url: url.origin,
		redirectTo,
	};
};

const PAYLOAD_SLUG = '/api/frontend-users/login';

export const actions: Actions = {
	default: async (event) => {
		const { request, fetch, cookies } = event;
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const [data, err] = await safePromise(
			makePayloadRequest<Payload.Auth.LoginResponse>({
				slug: PAYLOAD_SLUG,
				fetch,
				init: {
					method: 'POST',
					body: JSON.stringify(form.data),
				},
			}),
			{
				errorMessage: 'Login failed',
			},
		);

		if (err) {
			const cause = err.cause;
			let message = 'Something went wrong';

			if (cause instanceof Error) {
				message = cause.message;
			} else if (cause instanceof Response) {
				message = cause.statusText;
			}

			setFlash(
				{
					title: err.message,
					message: message,
					type: 'error',
				},
				event,
			);

			return error(501);
		}

		cookies.set('token', data.token, {
			path: '/',
			httpOnly: true,
			secure: !dev,
			maxAge: form.data.remember_me
				? 14 * 24 * 60 * 60 // 14 days
				: undefined,
		});

		if (form.data.remember_me) {
			cookies.set('remember_user', '1', {
				path: '/',
				httpOnly: false,
				secure: !dev,
				maxAge: form.data.remember_me
					? 14 * 24 * 60 * 60 // 14 days
					: undefined,
			});
		}

		return {
			form,
		};
	},
};

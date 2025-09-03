import { makePayloadRequest } from '$lib/utils/payload.js';
import { safePromise } from '$lib/utils/safePromise.js';
import { error, redirect } from '@sveltejs/kit';

export const prerender = false;
export const config = {
	isr: false,
};

const PAYLOAD_SLUG = '/api/globals/resume';

export const load = async ({ locals, fetch }) => {
	const session = locals.session;

	if (!session?.user) {
		redirect(303, '/auth/login?redirectTo=/resume');
	}

	const [resume, err] = await safePromise(
		makePayloadRequest<Payload.Globals.Resume>({
			slug: PAYLOAD_SLUG,
			fetch,
			token: session.user.token,
		}),
		{
			errorMessage: 'Failed to load resume data',
		},
	);

	if (err?.cause instanceof Response) {
		error(err.cause.status, err.cause.statusText);
	} else if (err) {
		error(500, err.message);
	}

	return {
		...resume,
	};
};

import { makePayloadRequest } from '$lib/utils/payload';
import { safePromise } from '$lib/utils/safePromise';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const PAYLOAD_SLUG = '/api/globals/home';
const PAYLOAD_BLOGPOSTINGS_SLUG = '/api/blog-postings';

export const load = (async ({ fetch }) => {
	const blogPostings = makePayloadRequest<
		Payload.CollectionResponse<Payload.Collections.BlogPostings>
	>({
		fetch,
		slug: PAYLOAD_BLOGPOSTINGS_SLUG,
	}).catch(() => undefined);

	const [homeData, err] = await safePromise(
		makePayloadRequest<Payload.Globals.Home>({
			fetch,
			slug: PAYLOAD_SLUG,
		}),
	);

	if (err) {
		if (err instanceof Response) {
			console.error(await err.json());
			error(err.status as NumericRange<400, 599>, err.statusText);
		} else {
			console.error(err);
			error(503);
		}
	}

	return {
		blogPostings,
		...homeData,
	};
}) satisfies PageServerLoad;

import { makePayloadRequest } from '$lib/utils/payload';
import { error, isHttpError, type NumericRange } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const PAYLOAD_SLUG = '/api/blog-postings';

export const load = (async ({ params, fetch }) => {
	try {
		const data = await makePayloadRequest<
			Payload.CollectionResponse<Payload.Collections.BlogPostings>
		>({
			fetch,
			slug: PAYLOAD_SLUG,
			where: {
				slug: {
					equals: params.posting,
				},
			},
		});

		if (data.totalDocs === 0) {
			error(404);
		}

		return data.docs[0];
	} catch (err) {
		if (err instanceof Response) {
			console.error(await err.json());
			error(err.status as NumericRange<400, 599>, err.statusText);
		} else if (isHttpError(err)) {
			error(err.status as NumericRange<400, 599>, err.body);
		} else {
			console.error(err);
			error(503);
		}
	}
}) satisfies PageServerLoad;

import { makePayloadRequest } from '$lib/utils';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const PAYLOAD_SLUG = '/api/globals/home';
const PAYLOAD_BLOGPOSTINGS_SLUG = '/api/blog-postings';


export const load = (async ({ fetch }) => {
    try {
        return {
            blogPostings: makePayloadRequest<Payload.CollectionResponse<Payload.Collections.BlogPostings>>({
                fetch,
                slug: PAYLOAD_BLOGPOSTINGS_SLUG,
            }),
            ...(await await makePayloadRequest<Payload.Globals.Home>({
                slug: PAYLOAD_SLUG,
                fetch,
            })),
        };

    } catch (err) {
        if (err instanceof Response) {
            console.error(await err.json());
            error(err.status as NumericRange<400, 599>, err.statusText);
        } else {
            console.error(err);
            error(503);
        }
    }
}) satisfies PageLoad;
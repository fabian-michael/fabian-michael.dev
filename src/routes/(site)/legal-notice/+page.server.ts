import { makePayloadRequest } from '$lib/utils/payload';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

const PAYLOAD_SLUG = '/api/globals/legal-notice';


export const load = (async ({ fetch }) => {
    try {
        return makePayloadRequest<Payload.Globals.LegalNotice>({
            slug: PAYLOAD_SLUG,
            fetch,
        });
    } catch (err) {
        if (err instanceof Response) {
            console.error(await err.json());
            error(err.status as NumericRange<400, 599>, err.statusText);
        } else {
            console.error(err);
            error(503);
        }
    }
}) satisfies PageServerLoad;
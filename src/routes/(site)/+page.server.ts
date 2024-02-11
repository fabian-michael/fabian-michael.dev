import { PUBLIC_PAYLOAD_BASE } from '$env/static/public';
import type { Payload } from '$lib/types/payload';
import { buildUrl } from '$lib/utils';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const PAYLOAD_SLUG = '/api/globals/home';


export const load = (async ({ fetch }) => {
    try {
        const payloadResponse = await fetch(buildUrl([
            PUBLIC_PAYLOAD_BASE,
            PAYLOAD_SLUG,
        ]));

        if (!payloadResponse.ok) {
            throw payloadResponse;
        }

        const data = await payloadResponse.json() as Payload.Globals.Home;
        return data;

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
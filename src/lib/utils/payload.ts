import { PAYLOAD_API_KEY } from '$env/static/private';
import { PUBLIC_PAYLOAD_BASE } from '$env/static/public';
import QueryString from 'qs';
import { buildUrl } from './url';

export async function makePayloadRequest<T>({
    slug,
    fetch,
    where,
    init,
}: {
    slug: string;
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
    init?: RequestInit;
    where?: Record<string, unknown>;
}): Promise<T> {
    const urlParts = [PUBLIC_PAYLOAD_BASE, slug];

    if (where) {
        const queryString = QueryString.stringify(
            {
                where,
            },
            {
                addQueryPrefix: true,
            }
        );

        urlParts.push(queryString);
    }

    const url = buildUrl(urlParts);

    const payloadResponse = await fetch(url, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `api-keys API-Key ${PAYLOAD_API_KEY}`,
            ...(init?.headers ?? {}),
        },
    });

    if (!payloadResponse.ok) {
        throw payloadResponse;
    }

    return payloadResponse.json() as Promise<T>;
}

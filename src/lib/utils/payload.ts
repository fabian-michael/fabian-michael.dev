import { PAYLOAD_API_KEY } from '$env/static/private';
import { PUBLIC_PAYLOAD_BASE } from '$env/static/public';
import QueryString from 'qs';
import { buildUrl } from './url';

interface MakePayloadRequestOptions {
    slug: string;
    where?: Record<string, unknown>;
    token?: string;
    apiKey?: string;
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
    init?: RequestInit;
}

export async function makePayloadRequest<T>({
    slug,
    where,
    token,
    apiKey = PAYLOAD_API_KEY,
    fetch,
    init = {},
}: MakePayloadRequestOptions): Promise<T> {
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
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(init?.headers as Record<string, string> ?? {}),
    };

    if (token) {
        headers['Authorization'] = `JWT ${token}`;
    } else if (apiKey) {
        headers['Authorization'] = `api-keys API-Key ${apiKey}`;
    }

    const payloadResponse = await fetch(url, {
        ...init,
        headers,
    });

    if (!payloadResponse.ok) {
        throw payloadResponse;
    }

    return payloadResponse.json() as Promise<T>;
}

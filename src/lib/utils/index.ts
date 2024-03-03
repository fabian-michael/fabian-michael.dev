import { PUBLIC_PAYLOAD_BASE } from '$env/static/public';
import { clsx, type ClassValue } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function trimEnd(str: string, char: string): string {
	return str.replace(new RegExp(char + '+$'), '');
}

export function trimStart(str: string, char: string): string {
	return str.replace(new RegExp('^' + char + '+'), '');
}

export function trim(str: string, char: string): string {
	return trimStart(trimEnd(str, char), char);
}

export const trimCurried = (char: string) => (str: string) => trim(str, char);

export function buildUrl(
	parts: string[],
	{ trailingSlash, leadingSlash }: { trailingSlash?: boolean; leadingSlash?: boolean } = {}
): string {
	const url = parts.filter(Boolean).map(trimCurried('/')).join('/');

	return (leadingSlash ? '/' : '') + url + (trailingSlash ? '/' : '');
}

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
		const queryString = qs.stringify(
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

	const payloadResponse = await fetch(url, init);

	if (!payloadResponse.ok) {
		throw payloadResponse;
	}

	return payloadResponse.json() as Promise<T>;
}

/**
 * @template T
 * @param input
 * @param init
 * @returns {T}
 * @throws {Response | Error}
 */
export const makeRequest = async <T = unknown>(
	input: RequestInfo | URL,
	init?: RequestInit | undefined,
): Promise<T> => {
	const response = await fetch(input, init);

	if (!response.ok) {
		throw response;
	}

	return response.json();
};

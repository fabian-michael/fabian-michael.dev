import { trimCurried } from './string';

export function buildUrl(
    parts: string[],
    { trailingSlash, leadingSlash }: { trailingSlash?: boolean; leadingSlash?: boolean } = {}
): string {
    const url = parts.filter(Boolean).map(trimCurried('/')).join('/');

    return (leadingSlash ? '/' : '') + url + (trailingSlash ? '/' : '');
}
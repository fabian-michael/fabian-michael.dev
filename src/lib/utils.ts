import { clsx, type ClassValue } from 'clsx';
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

export function buildUrl(parts: string[], trailingSlash?: boolean): string {
    const url = parts
        .filter(Boolean)
        .map(trimCurried('/'))
        .join('/');

    return url + (trailingSlash ? '/' : '');
}
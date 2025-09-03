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

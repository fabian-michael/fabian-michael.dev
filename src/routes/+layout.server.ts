import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	const { locale } = locals;
	// pass locale information from "server-context" to "shared server + client context"
	return { locale }
}

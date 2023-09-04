import type { Locales } from '$i18n/i18n-types'
import { loadLocaleAsync } from '$i18n/i18n-util.async'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data }) => {
	const locale = data.locale as Locales
	// load dictionary into memory
	await loadLocaleAsync(locale)

	// pass locale to the "rendering context"
	return { locale }
}

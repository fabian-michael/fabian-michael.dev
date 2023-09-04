<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let _locale: string = '';

	export let href: string;
	export { _locale as locale };

	interface $$Props extends HTMLAnchorAttributes {
		href: string;
		locale?: string;
	}

	$: _href = href.startsWith('/') ? `/${_locale || $locale}${href}` : href;
</script>

<a
	href="{_href}"
	{...$$restProps}
>
	<slot />
</a>

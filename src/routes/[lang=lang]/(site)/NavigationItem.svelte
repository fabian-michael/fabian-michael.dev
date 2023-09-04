<script lang="ts">
	import { page } from '$app/stores';
	import { Link } from '$components/link';
	import { locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';

	export let href: string;

	$: active = $page.url.pathname === `/${$locale}${href === '/' ? '' : href}`;
</script>

<Link
	{href}
	class="{cn({ active })}"
>
	<slot />
</Link>

<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	export let href: string;

	$: active = href === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(href);
</script>

<a
	{href}
	class="{cn({ active })}"
>
	<slot />
</a>

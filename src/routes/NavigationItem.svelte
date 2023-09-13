<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	export let href: string;

	$: active = $page.url.pathname === `/${href === '/' ? '' : href}`;
</script>

<a
	{href}
	class="{cn({ active })}"
>
	<slot />
</a>

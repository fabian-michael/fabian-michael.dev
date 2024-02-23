<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	export let href: string;
	export let preload: boolean = true;

	$: active = href === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(href);
</script>

<a
	{href}
	class={cn('whitespace-nowrap', { active })}
	data-sveltekit-preload-data={preload ? 'hover' : 'off'}
>
	<slot />
</a>

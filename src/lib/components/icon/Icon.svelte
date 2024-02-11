<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';

	let className: string | null = '';
	export { className as class };
	export let icon: ComponentType<SvelteComponent<SvelteHTMLElements['svg']>>;

	interface $$Props extends SVGAttributes<SVGElement> {
		icon: ComponentType<SvelteComponent<SvelteHTMLElements['svg']>>;
	}
</script>

<svelte:component
	this={icon}
	class={cn('inline-block leading-none', className)}
	aria-hidden="true"
	{...$$restProps}
/>

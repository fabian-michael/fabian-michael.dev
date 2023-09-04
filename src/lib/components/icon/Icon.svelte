<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Icon, IconProps } from '@tabler/icons-svelte';
	import type { ComponentType } from 'svelte';

	let className: string = '';
	export { className as class };
	export let icon: ComponentType<Icon>;

	interface $$Props extends IconProps {
		icon: ComponentType<Icon>;
	}
</script>

<svelte:component
	this="{icon}"
	class="{cn('inline-block leading-none align-middle', className)}"
	aria-hidden="true"
	{...$$restProps}
/>

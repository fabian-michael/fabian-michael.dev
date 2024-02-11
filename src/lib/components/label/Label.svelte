<script lang="ts">
	import { Icon } from '$components/icon';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface LabelProps {
		class?: string;
		icon: ComponentType<SvelteComponent<SvelteHTMLElements['svg']>>;
	}

	const { icon, class: className } = $props<LabelProps>();
</script>

<span class="whitespace-nowrap">
	<Icon
		{icon}
		class="align-middle"
		width="1em"
		height="1em"
	/>
	<span class="whitespace-normal align-middle">
		<slot />
	</span>
</span>

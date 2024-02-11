<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import { writable } from 'svelte/store';
	import { fade, fly, slide } from 'svelte/transition';

	type Trigger = typeof trigger;

	type CollapsibleProps = {
		open?: boolean;
		onOpenChange: ChangeFn<boolean>;
		triggerRef?: (trigger: Trigger) => void;
	};

	const { open: _open = false, onOpenChange, triggerRef } = $props<CollapsibleProps>();
	const openStore = writable(_open);

	const {
		elements: { root, content, trigger },
		states: { open },
	} = createCollapsible({
		open: openStore,
		onOpenChange,
	});
	triggerRef?.(trigger);

	$effect(() => {
		openStore.set(_open);
	});
</script>

<div use:melt={$root}>
	{#if $open}
		<div
			use:melt={$content}
			transition:slide={{ duration: 300 }}
		>
			<div transition:fade={{ duration: 200 }}>
				<div transition:fly={{ y: -32, duration: 300 }}>
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>

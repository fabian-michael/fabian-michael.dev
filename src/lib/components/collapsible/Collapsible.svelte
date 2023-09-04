<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade, fly, slide } from 'svelte/transition';

	let _open = false;
	export { _open as open };

	const openStore = writable(_open);

	const {
		elements: { root, content, trigger },
		states: { open },
	} = createCollapsible({
		open: openStore,
	});

	export { trigger };

	afterUpdate(() => {
		if (_open !== $openStore) {
			$openStore = _open;
		}
	});

	onMount(() => {
		return openStore.subscribe((value) => {
			if (value !== _open) {
				_open = value;
			}
		});
	});
</script>

<div use:melt="{$root}">
	{#if $open}
		<div
			use:melt="{$content}"
			transition:slide="{{ duration: 300 }}"
		>
			<div transition:fade="{{ duration: 200 }}">
				<div transition:fly="{{ y: -32, duration: 300 }}">
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>

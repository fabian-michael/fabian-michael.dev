<script lang="ts">
	import { page } from '$app/stores';
	import { createToaster, melt } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { getFlash } from 'sveltekit-flash-message';
	import type { ToastData, ToasterContext } from '.';

	const {
		elements: { content, title, description, close },
		helpers: { addToast },
		states: { toasts },
		actions: { portal },
	} = createToaster<ToastData>();

	setContext<ToasterContext>('Toaster', {
		addToast,
	});

	const flash = getFlash(page);
	$effect(() => {
		if ($flash) {
			addToast({
				data: $flash,
			});
		}

		$flash = undefined;
	});
</script>

<slot />

<div class="toast-top toast z-50" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="alert shadow-lg"
			class:alert-error={data.type === 'error'}
		>
			<div>
				{#if data.title}
					<h3 use:melt={$title(id)} class="font-semibold">
						{data.title}
					</h3>
				{/if}
				<div use:melt={$description(id)}>
					{data.message}
				</div>
			</div>
			<button use:melt={$close(id)} class="btn btn-circle btn-sm btn-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	{/each}
</div>

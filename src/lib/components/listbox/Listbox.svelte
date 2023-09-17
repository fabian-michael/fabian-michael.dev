<script lang="ts">
	import { writable } from 'svelte/store';

	import { Icon } from '$components/icon';
	import { cn } from '$lib/utils';
	import type { SelectOption } from '@melt-ui/svelte';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { IconCheck } from '@tabler/icons-svelte';
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import type { IListboxOption } from './Listbox';

	const dispatchEvent = createEventDispatcher();

	type T = $$Generic<string | number>;

	let className: string = '';
	export { className as class };

	export let options: IListboxOption<T>[];
	export let defaultValue = options[0].value;
	export let value: T = defaultValue;

	const selected = writable<SelectOption<T>>(options.find((option) => option.value === value ?? defaultValue));

	const {
		states: { selectedLabel },
		helpers: { isSelected },
		elements: { menu, option, trigger },
	} = createSelect({
		selected,
		positioning: {
			placement: 'bottom',
			sameWidth: false,
		},
	});

	afterUpdate(() => {
		if (value !== $selected?.value) {
			$selected = options.find((option) => option.value === value ?? defaultValue)!;
		}
	});

	onMount(() => {
		const unsubscribe = selected.subscribe(($selected) => {
			if (value !== $selected?.value) {
				value = $selected?.value;
				dispatchEvent('change', value);
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div class="{cn('dropdown', className)}">
	<slot
		trigger="{$trigger}"
		label="{$selectedLabel}"
	/>

	<ul
		class="p-1 border rounded-lg shadow-lg dropdown-content bg-base-200 border-base-300"
		use:melt="{$menu}"
	>
		{#each options as item}
			<li
				class="flex items-center gap-1 px-1 leading-7 rounded-md cursor-default select-none hover:bg-accent hover:text-accent-content"
				use:melt="{$option(item)}"
			>
				{#if $isSelected(item.value)}
					<IconCheck class="w-4 h-4 shrink-0" />
				{:else}
					<span class="inline-block w-4 h-4 shrink-0"></span>
				{/if}

				<span class="flex-1">{item.label}</span>

				{#if item.icon}
					<Icon
						class="w-auto h-4 ml-2 shrink-0"
						icon="{item.icon}"
					/>
				{/if}
			</li>
		{/each}
	</ul>
</div>

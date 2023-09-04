<script lang="ts">
	import { writable } from 'svelte/store';

	import { Icon } from '$components/icon';
	import LL from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { IconCaretDownFilled } from '@tabler/icons-svelte';
	import { Check } from 'lucide-svelte';
	import { afterUpdate, onMount } from 'svelte';
	import type { IListboxOption } from './Listbox';

	type T = $$Generic<string | number>;

	let className: string = '';
	export { className as class };

	export let options: IListboxOption<T>[];
	export let value: T = '' as T;
	export let placeholder: string = '';

	const valueStore = writable(value);

	const {
		states: { valueLabel },
		helpers: { isSelected },
		elements: { menu, option, trigger },
	} = createSelect({
		value: valueStore,
		positioning: {
			placement: 'bottom',
			sameWidth: false,
		},
	});

	afterUpdate(() => {
		if (value !== $valueStore) {
			$valueStore = value;
		}
	});

	onMount(() => {
		const unsubscribe = valueStore.subscribe((val) => {
			if (value !== val) {
				value = val as T;
			}
		});

		return () => {
			unsubscribe();
		};
	});

	$: selectedOption = options.find((option) => option.value === value);
</script>

<div class="{cn('dropdown', className)}">
	<span
		class="justify-between w-full normal-case"
		use:melt="{$trigger}"
		aria-label="{placeholder ?? $LL.common.select.placeholder()}"
	>
		<span class="inline-flex gap-1 items-center">
			{$valueLabel ?? placeholder ?? $LL.common.select.placeholder()}

			{#if selectedOption?.icon}
				<svelte:component
					this="{selectedOption.icon}"
					class="w-auto h-4"
				/>
			{/if}
		</span>

		<IconCaretDownFilled class="w-auto h-4 ml-1 shrink-0" />
	</span>

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
					<Check class="w-4 h-4 shrink-0" />
				{:else}
					<span class="inline-block w-4 h-4 shrink-0"></span>
				{/if}

				<span class="flex-1">{item.label}</span>

				{#if item.icon}
					<Icon
						class="w-auto h-4 shrink-0 ml-2"
						icon="{item.icon}"
					/>
				{/if}
			</li>
		{/each}
	</ul>
</div>

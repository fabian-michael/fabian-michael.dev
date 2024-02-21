<script
	lang="ts"
	generics="T extends string | number"
>
	import Logo from '$components/logo/Logo_.svelte';

	import { Icon } from '$components/icon';
	import { cn } from '$lib/utils';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import IconCheck from '~icons/tabler/check';

	import type { SelectOption } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import type { IListboxOption } from './Listbox';

	type Trigger = typeof trigger;

	interface IListboxProps<T extends string | number> {
		class?: string;
		options: IListboxOption<T>[];
		defaultValue?: T;
		value?: T;
		onchange?: ChangeFn<SelectOption<T> | undefined>;
		triggerRef?: (trigger: Trigger) => void;
	}

	let { class: className, options, defaultValue, value, onchange, triggerRef } = $props<IListboxProps<T>>();

	const findSelectedOptionByValue = () => options.find((option) => option.value === value ?? defaultValue)!;
	const selected = writable<SelectOption<T>>(findSelectedOptionByValue());

	const {
		states: { selectedLabel },
		helpers: { isSelected, isHighlighted },
		elements: { menu, option, trigger },
	} = createSelect({
		selected,
		onSelectedChange: onchange,
		positioning: {
			placement: 'bottom',
			sameWidth: false,
		},
	});
	triggerRef?.(trigger);

	$effect(() => {
		const selectedOption = findSelectedOptionByValue();
		if (selectedOption?.value !== get(selected)?.value) {
			selected.set(selectedOption);
		}
	});

	onMount(() => {
		return selected.subscribe((selected) => {
			if (selected.value !== value) {
				value = selected.value;
			}
		});
	});
</script>

<div class={cn('dropdown', className)}>
	<slot label={$selectedLabel} />

	<ul
		class="p-1 border rounded-lg shadow-lg dropdown-content bg-base-200 border-base-300"
		use:melt={$menu}
	>
		{#each options as _option}
			<li use:melt={$option(_option)}>
				<div
					class={cn('flex items-center gap-1 px-1 leading-7 rounded-md cursor-default select-none', {
						'bg-primary text-primary-content': $isHighlighted(_option.value),
					})}
				>
					<span
						class={cn('inline-block w-4 h-4 shrink-0', {
							invisible: !$isSelected(_option.value),
						})}
					>
						<IconCheck />
					</span>

					<span class="flex-1">{_option.label}</span>

					{#if _option.icon}
						<Icon
							class="w-auto h-4 ml-2 shrink-0"
							icon={_option.icon}
						/>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>

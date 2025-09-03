<script lang="ts" generics="T extends string | number">
	import { fade } from 'svelte/transition';

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
		title?: string;
		options: IListboxOption<T>[];
		defaultValue?: T;
		value?: T;
		onchange?: ChangeFn<SelectOption<T> | undefined>;
		triggerRef?: (trigger: Trigger) => void;
	}

	let {
		class: className,
		title,
		options,
		defaultValue,
		value,
		onchange,
		triggerRef,
	} = $props<IListboxProps<T>>();

	const findSelectedOptionByValue = () =>
		options.find((option) => option.value === value ?? defaultValue)!;
	const selected = writable<SelectOption<T>>(findSelectedOptionByValue());

	const {
		states: { open, selectedLabel },
		helpers: { isSelected, isHighlighted },
		elements: { menu, option, trigger },
	} = createSelect({
		selected,
		onSelectedChange: onchange,
		positioning: {
			placement: 'bottom',
			sameWidth: false,
			gutter: 16,
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

	{#if $open}
		<ul
			class="dropdown-content menu rounded-box bg-base-200 shadow-lg"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#if title}
				<li class="menu-title text-center">{title}</li>
			{/if}

			{#each options as _option}
				<li>
					<button
						use:melt={$option(_option)}
						class={cn('flex items-center gap-1', {
							'!bg-secondary !text-secondary-content': $isHighlighted(_option.value),
						})}
					>
						<span
							class={cn('inline-block h-4 w-4 shrink-0', {
								invisible: !$isSelected(_option.value),
							})}
						>
							<IconCheck />
						</span>

						<span class="flex-1">{_option.label}</span>

						{#if _option.icon}
							<Icon class="ml-2 h-5 w-auto shrink-0" icon={_option.icon} />
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

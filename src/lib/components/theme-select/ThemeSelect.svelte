<script lang="ts">
	import { Icon } from '$components/icon';
	import { Listbox, type IListboxOption } from '$components/listbox';
	import { themeStore, type Theme } from '$lib/client/stores/theme-store';
	import { melt } from '@melt-ui/svelte';
	import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-svelte';

	let options: IListboxOption<Theme>[] = [
		{
			value: 'night',
			label: 'Dark',
			icon: IconMoon,
		},
		{
			value: 'light',
			label: 'Light',
			icon: IconSun,
		},
		{
			value: '',
			label: 'System',
			icon: IconSunMoon,
		},
	];

	let loading = true;
	$: selectedTheme = $themeStore;
	$: icon = options.find((option) => option.value === selectedTheme)?.icon;
	$: loading = typeof selectedTheme === 'undefined';
</script>

<Listbox
	{options}
	value="{$themeStore}"
	defaultValue="night"
	on:change="{(event) => themeStore.set(event.detail)}"
	let:trigger
	let:label
>
	<button
		class="btn btn-ghost btn-square"
		use:melt="{trigger}"
		disabled="{loading}"
	>
		{#if loading}
			<span class="loading loading-spinner text-white"></span>
		{:else if icon}
			<Icon {icon} />
		{:else}
			<IconSunMoon />
		{/if}
	</button>
</Listbox>

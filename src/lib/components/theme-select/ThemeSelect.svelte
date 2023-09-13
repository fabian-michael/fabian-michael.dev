<script lang="ts">
	import { Icon } from '$components/icon';
	import { Listbox, type IListboxOption } from '$components/listbox';
	import { themeStore, type Theme } from '$lib/client/stores/theme-store';
	import { melt } from '@melt-ui/svelte';
	import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-svelte';

	let options: IListboxOption<Theme>[] = [
		{
			value: 'dark',
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

	$: selectedTheme = $themeStore;
	$: icon = options.find((option) => option.value === selectedTheme)?.icon;
</script>

<Listbox
	{options}
	bind:value="{$themeStore}"
	let:trigger
	let:label
>
	<button
		class="btn btn-ghost btn-square"
		use:melt="{trigger}"
	>
		{#if icon}
			<Icon {icon} />
		{/if}
	</button>
</Listbox>

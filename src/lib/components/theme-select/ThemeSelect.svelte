<script lang="ts">
	import { Icon } from '$components/icon';
	import { Listbox, type IListboxOption } from '$components/listbox';
	import {
		DARK_THEME,
		LIGHT_THEME,
		SYSTEM_THEME,
		themeStore,
		type Theme,
	} from '$lib/client/stores/theme-store';
	import { melt } from '@melt-ui/svelte';
	import PhGearFine from '~icons/ph/gear-fine';
	import TablerMoonStars from '~icons/tabler/moon-stars';
	import TablerSun from '~icons/tabler/sun';
	import TablerSunMoon from '~icons/tabler/sun-moon';

	let options: IListboxOption<Theme>[] = [
		{
			value: DARK_THEME,
			label: 'Dark',
			icon: TablerMoonStars,
		},
		{
			value: LIGHT_THEME,
			label: 'Light',
			icon: TablerSun,
		},
		{
			value: SYSTEM_THEME,
			label: 'System',
			icon: TablerSunMoon,
		},
	];

	let listboxTrigger: any;
	let loading = $state(true);
	const selectedTheme = $derived($themeStore);
	const icon = $derived(options.find((option) => option.value === selectedTheme)?.icon);

	$effect(() => {
		loading = selectedTheme === undefined || listboxTrigger === undefined;
	});
</script>

<Listbox
	title="Theme"
	{options}
	value={selectedTheme}
	defaultValue={DARK_THEME}
	onchange={({ next }) => {
		themeStore.set(next?.value ?? DARK_THEME);
		return next;
	}}
	triggerRef={(trigger) => (listboxTrigger = trigger)}
>
	{#if loading}
		<span class="btn btn-square btn-ghost">
			<span class="loading loading-spinner text-white"></span>
		</span>
	{:else}
		<button class="btn btn-square text-lg btn-ghost" use:melt={$listboxTrigger}>
			{#if icon}
				<Icon {icon} />
			{:else}
				<PhGearFine />
			{/if}
		</button>
	{/if}
</Listbox>

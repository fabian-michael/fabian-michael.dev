<script lang="ts">
	import { Listbox, type IListboxOption } from '$components/listbox';
	import LL from '$i18n/i18n-svelte';
	import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	type Theme = 'dark' | 'light' | '';

	let mounted = false;
	let selectedTheme: Theme = '';
	let options: IListboxOption<Theme>[] = [
		{
			value: 'dark',
			label: $LL.theme.dark(),
			icon: IconMoon,
		},
		{
			value: 'light',
			label: $LL.theme.light(),
			icon: IconSun,
		},
		{
			value: '',
			label: $LL.theme.system(),
			icon: IconSunMoon,
		},
	];

	$: if (mounted) {
		window.setTheme(selectedTheme);
	}

	onMount(() => {
		mounted = true;
		selectedTheme = localStorage.getItem('theme') as Theme;
	});
</script>

<Listbox
	{options}
	bind:value="{selectedTheme}"
/>

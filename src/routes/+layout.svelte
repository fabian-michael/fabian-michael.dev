<script lang="ts">
	import '../theme.css';

	import '../app.css';

	import { setLocale } from '$i18n/i18n-svelte';

	export let data;

	// setup i18n
	setLocale(data.locale);
</script>

<slot />

<script lang="ts">
	import '../theme.css';

	import '../app.css';

	import Header from './Header.svelte';

	let isMenuOpen = false;
</script>

<Header bind:isMenuOpen />

<main class="overflow-hidden rounded-t-3xl">
	<slot />
</main>

<style lang="scss">
</style>

<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	let isMenuOpen = false;
</script>

<Header bind:isMenuOpen />

<main class="overflow-hidden rounded-t-3xl">
	<slot />
</main>

<Footer />

<style lang="scss">
</style>

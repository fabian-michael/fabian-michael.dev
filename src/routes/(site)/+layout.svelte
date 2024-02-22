<script lang="ts">
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';
</script>

<svelte:head>
	<meta
		name="author"
		content="Fabian Michael"
	/>
	<meta
		name="copyright"
		content="Fabian Michael"
	/>
</svelte:head>

<Navbar />

<main class="py-12 space-y-12">
	<slot />
</main>

<Footer />

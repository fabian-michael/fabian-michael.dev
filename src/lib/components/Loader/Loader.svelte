<script lang="ts">
	export let size = 24;
</script>

<span class="loader text-primary">
	<!-- <IconLoader2 {size} /> -->
</span>

<style lang="postcss">
	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}

	.loader {
		display: inline-block;
		animation: spin 1s cubic-bezier(0.79, 0.33, 0.14, 0.53) infinite;
	}
</style>

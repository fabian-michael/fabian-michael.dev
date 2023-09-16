<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container text-center py-16">
	<h1 class="text-6xl font-thin">{$page.status} | {$page.error?.message}</h1>
</div>

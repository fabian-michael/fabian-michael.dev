<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container text-center">
	<h1 class="text-6xl font-bold">{$page.status} | {$page.error?.message}</h1>
</div>

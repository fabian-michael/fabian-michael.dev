<script lang="ts">
	const { class: className = '', centered = false } = $props<{
		class?: string;
		centered?: boolean;
	}>();
</script>

<div
	class="prose prose-img:rounded-xl {className}"
	class:mx-auto={centered}
>
	<slot />
</div>

<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		class: className = '',
		centered = false,
		children,
	} = $props<{
		class?: string;
		centered?: boolean;
		children: Snippet<void>;
	}>();
</script>

<div
	class="prose prose-img:rounded-xl {className}"
	class:mx-auto={centered}
>
	{@render children()}
</div>

<script lang="ts">
	import type { ISelectOption } from '$components/select';
	import { cn } from '$lib/utils';

	let className: string = '';
	export { className as class };

	export let options: ISelectOption[];
	export let placeholder: string | undefined;
	export let value: string | undefined = '';
</script>

<select class={cn('select select-sm accent-accent', className)} bind:value>
	<option value="" disabled selected hidden>
		{placeholder}
	</option>
	{#each options as item}
		<option class="option font-sans accent-accent" value={item.value}>
			{item.label}
		</option>
	{/each}
</select>

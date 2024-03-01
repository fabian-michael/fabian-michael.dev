<script lang="ts">
	import { getContext } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { FormContext } from '.';

	type InputProps = HTMLInputAttributes & {
		label: string;
		name: string;
	};

	const { ...props } = $props<InputProps>();

	const { form, errors, constraints } = getContext<FormContext>('form');

	const error = $derived($errors[props.name]);
</script>

<div class="form-control">
	<label
		for={props.id}
		class="label"
	>
		<span class="label-text">
			{props.label}
		</span>
	</label>
	<input
		type={props.type}
		id={props.id}
		name={props.name}
		placeholder={props.placeholder}
		class="input input-bordered"
		class:input-error={$errors[props.name]}
		disabled={props.disabled}
		value={$form[props.name]}
		on:input={(event) => ($form[props.name] = (event.target as HTMLInputElement)?.value)}
		{...$constraints[props.name]}
	/>
	{#if error}
		<span class="label">
			<span class="label-text text-error">
				{error}
			</span>
		</span>
	{/if}
</div>

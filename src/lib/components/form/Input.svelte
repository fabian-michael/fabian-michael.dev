<script lang="ts">
	import { getContext } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Form } from '.';

	interface $$Props extends HTMLInputAttributes {
		label: string;
	}

	const { form, errors, constraints } = getContext('form') as Form<any, any>;

	$: error = $errors[$$props.name];
</script>

<div class="form-control">
	<label
		for="{$$props.id}"
		class="label"
	>
		<span class="label-text">
			{$$props.label}
		</span>
	</label>
	<input
		type="{$$props.type}"
		id="{$$props.id}"
		name="{$$props.name}"
		placeholder="{$$props.placeholder}"
		class="input input-bordered"
		class:input-error="{$errors[$$props.name]}"
		disabled="{$$props.disabled}"
		value="{$form[$$props.name]}"
		on:input="{(event) => ($form[$$props.name] = event.target?.value)}"
		{...$constraints[$$props.name]}
	/>
	{#if error}
		<span class="label">
			<span class="label-text text-error">
				{error}
			</span>
		</span>
	{/if}
</div>

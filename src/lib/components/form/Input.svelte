<script
	lang="ts"
	generics="T extends Record<string, unknown>"
>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';

	type InputProps<T extends Record<string, unknown>> = Omit<HTMLInputAttributes, 'form' | 'name' | 'value'> & {
		form: SuperForm<T>;
		label: string;
		name: FormPathLeaves<T>;
	};

	const { form, ...props } = $props<InputProps<T>>();

	const { value, errors, constraints } = formFieldProxy(form, props.name);
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
		{...props}
		bind:value={$value}
		class="input input-bordered"
		class:input-error={$errors?.length}
		{...$constraints}
	/>
	{#if $errors?.length}
		<span class="label">
			<span class="label-text text-error">
				{$errors}
			</span>
		</span>
	{/if}
</div>

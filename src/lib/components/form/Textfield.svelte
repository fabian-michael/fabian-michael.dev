<script
	lang="ts"
	generics="T extends Record<string, unknown>"
>
	import type { ComponentType } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy, stringProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';

	type InputProps<T extends Record<string, unknown>> = Omit<HTMLInputAttributes, 'form' | 'name' | 'value'> & {
		form: SuperForm<T>;
		label: string;
		name: FormPathLeaves<T>;
		icon?: ComponentType;
	};

	const { form, icon, ...props } = $props<InputProps<T>>();

	const { errors, constraints } = formFieldProxy(form, props.name as FormPathLeaves<T>);
	const value = stringProxy(form, props.name as FormPathLeaves<T>, {
		empty: 'undefined',
	});
</script>

<div class="form-control">
	<label
		for={props.id}
		class="label"
	>
		<span
			class="label-text"
			class:font-medium={$constraints?.required}
		>
			{props.label}
			{$constraints?.required && '*'}
		</span>
	</label>
	<div
		class="flex items-center gap-2 input input-bordered"
		class:input-error={$errors?.length}
	>
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		<input
			{...props}
			bind:value={$value}
			class="grow"
			{...$constraints}
		/>
	</div>
	{#if $errors?.length}
		<span class="label">
			<span class="label-text text-error">
				{$errors}
			</span>
		</span>
	{/if}
</div>

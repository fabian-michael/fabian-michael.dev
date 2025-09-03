<script lang="ts" generics="T extends Record<string, unknown>">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import {
		formFieldProxy,
		stringProxy,
		type FormPathLeaves,
		type SuperForm,
	} from 'sveltekit-superforms';

	type HiddenFieldProps<T extends Record<string, unknown>> = Omit<
		HTMLInputAttributes,
		'type' | 'form' | 'name'
	> & {
		form: SuperForm<T>;
		name: FormPathLeaves<T>;
		showErrors?: boolean;
	};

	const { form, value: _value, showErrors = true, ...props } = $props<HiddenFieldProps<T>>();

	const { errors, constraints } = formFieldProxy(form, props.name as FormPathLeaves<T>);
	const value = stringProxy(form, props.name as FormPathLeaves<T>, {
		empty: 'undefined',
	});

	$effect(() => {
		$value = _value;
	});
</script>

<div class="sr-only">
	<input {...props} type="hidden" value={$value} {...$constraints} />
</div>
{#if $errors?.length && showErrors}
	<div class="label">
		<span class="label-text text-error">
			{$errors}
		</span>
	</div>
{/if}

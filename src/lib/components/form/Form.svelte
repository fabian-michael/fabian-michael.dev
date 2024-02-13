<script
	lang="ts"
	generics="T extends Record<string, unknown>"
>
	import type { ValidationAdapter } from 'sveltekit-superforms/adapters';

	import { setContext } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm, type FormOptions } from 'sveltekit-superforms/client';

	type FormProps<T extends Record<string, unknown>> = Omit<HTMLFormAttributes, 'action'> & {
		data: SuperValidated<T>;
		spa?: true;
		validationAdapter: ValidationAdapter<T>;
		action: string | FormOptions<T>['onUpdate'];
	};

	const { data, spa, validationAdapter, action, ...restProps } = $props<FormProps<T>>();

	let { enhance, form, errors, constraints } = superForm(data, {
		SPA: spa,
		validators: validationAdapter,
		onUpdate: typeof action !== 'string' ? action : undefined,
	});

	setContext('form', {
		form,
		errors,
		constraints,
	});
</script>

<form
	{...restProps}
	novalidate
	method="post"
	use:enhance
>
	<slot errors={$errors} />
</form>

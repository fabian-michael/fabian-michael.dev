<script
	lang="ts"
	generics="S extends ZodObject<ZodRawShape>"
>
	import type { FormContext } from '.';

	import type { ZodObject, ZodRawShape } from 'zod';

	import { zodClient } from 'sveltekit-superforms/adapters';

	import { setContext } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm, type FormOptions } from 'sveltekit-superforms/client';

	type FormProps<S extends ZodObject<ZodRawShape>, T extends Record<string, unknown> = Infer<S>> = Omit<
		HTMLFormAttributes,
		'action'
	> & {
		schema: S;
		data: SuperValidated<T>;
		action: string | FormOptions<T>['onUpdate'];
		spa?: true;
	};

	const { data: data, spa, schema, action, ...restProps } = $props<FormProps<S>>();

	let { enhance, form, errors, constraints } = superForm(data, {
		SPA: spa,
		validators: zodClient(schema),
		onUpdate: typeof action !== 'string' ? action : undefined,
	});

	setContext<FormContext>('form', {
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

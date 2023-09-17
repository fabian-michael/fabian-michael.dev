<script lang="ts">
	import type { AnyZodObject } from 'zod';

	import { setContext } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
	import { superForm, type FormOptions } from 'sveltekit-superforms/client';

	type S = $$Generic<AnyZodObject>;
	type T = $$Generic<ZodValidation<S>>;

	export let data: SuperValidated<T>;
	export let spa: true | undefined = undefined;
	export let schema: T | undefined = undefined;
	export let action: string | FormOptions<T, any>['onUpdate'] = '';
	let { enhance, form, errors, constraints } = superForm(data, {
		SPA: spa,
		validators: schema,
		onUpdate: typeof action !== 'string' ? action : undefined,
	});

	interface $$Props extends Omit<HTMLFormAttributes, 'action'> {
		data: SuperValidated<T>;
		spa?: true;
		schema?: T;
		action: string | FormOptions<T, any>['onUpdate'];
	}

	setContext('form', {
		form,
		errors,
		constraints,
	});
</script>

<form
	{...$$restProps}
	novalidate
	method="post"
	use:enhance
>
	<slot errors="{$errors}" />
</form>

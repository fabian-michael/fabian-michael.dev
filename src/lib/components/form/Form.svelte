<script
	lang="ts"
	generics="S extends ZodObject<ZodRawShape>"
>
	import type { ZodObject, ZodRawShape } from 'zod';

	import { zod } from 'sveltekit-superforms/adapters';

	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { Infer, SuperFormEvents, SuperValidated } from 'sveltekit-superforms';
	import { superForm, type FormOptions } from 'sveltekit-superforms/client';

	type FormProps<S extends ZodObject<ZodRawShape>, T extends Record<string, unknown> = Infer<S>> = Omit<
		HTMLFormAttributes,
		'action' | 'method' | 'onsubmit'
	> &
		SuperFormEvents<Infer<S>, unknown> & {
			dataType?: 'json' | 'form';
			schema: S;
			data: SuperValidated<T>;
			action: string | FormOptions<T>['onUpdate'];
			spa?: true;
		};

	const { dataType, data, spa, schema, action, onError, onResult, onSubmit, onUpdate, onUpdated, ...restProps } =
		$props<FormProps<S>>();

	const form = superForm(data, {
		dataType,
		SPA: spa,
		validators: zod(schema),
		onUpdate: typeof action !== 'string' ? action : undefined,
	});

	const { enhance, submitting, options } = form;

	// update the validators when the schema changes (multi-steps forms)
	$effect(() => {
		options.validators = zod(schema);
	});
</script>

<form
	{...restProps}
	method="post"
	use:enhance={{
		onError,
		onResult,
		onSubmit,
		onUpdate,
		onUpdated,
	}}
>
	<slot
		{form}
		submitting={$submitting}
	/>
</form>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { PUBLIC_CF_TURNSTILE_SITE_KEY } from '$env/static/public';

	import { onDestroy } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import {
		formFieldProxy,
		type FormPathLeaves,
		type FormPathType,
		type SuperForm,
	} from 'sveltekit-superforms';

	type InputProps<T extends Record<string, unknown>> = Omit<
		HTMLInputAttributes,
		'form' | 'name' | 'value'
	> & {
		form: SuperForm<T>;
		label: string;
	};

	let container = $state<HTMLDivElement | undefined>();
	let widgetId = $state<string | undefined | null>();

	const { form, ...props } = $props<InputProps<T>>();

	const { value, errors } = formFieldProxy(form, 'cf-turnstile-response' as FormPathLeaves<T>);

	$effect(() => {
		if (!PUBLIC_CF_TURNSTILE_SITE_KEY || !container || $value) {
			return;
		}

		if (widgetId) {
			turnstile.reset(widgetId);
		} else {
			widgetId = turnstile.render(container, {
				sitekey: PUBLIC_CF_TURNSTILE_SITE_KEY,
				callback: (token) => {
					value.set(token as FormPathType<Record<string, unknown>, FormPathLeaves<T>>);
				},
			});
		}
	});

	onDestroy(() => {
		value.set(undefined as FormPathType<Record<string, unknown>, FormPathLeaves<T>>);
		// @ts-ignore 'remove' is not in the typedefs but it is in the code
		turnstile.remove(widgetId);
	});
</script>

<div class="form-control">
	<label for={props.id} class="label">
		<span class="label-text">
			{props.label}
		</span>
	</label>
	<div bind:this={container} />
	{#if $errors?.length}
		<span class="label">
			<span class="label-text text-error">
				{$errors}
			</span>
		</span>
	{/if}
</div>

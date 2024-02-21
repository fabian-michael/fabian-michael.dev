<script lang="ts">
	import { goto } from '$app/navigation';
	import { Form, Input } from '$components/form/index.js';
	import { sleep } from '$lib/utils.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import { defaults } from 'sveltekit-superforms/client';
	import { schema } from './schema.js';
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	export let data;

	const form = defaults(zod(schema));
	let status: 'initial' | 'idle' | 'loading' = 'initial';
	// let error = '';

	type ToastData = {
		title: string;
		description: string;
		type: 'error';
	};

	const {
		elements: { content, title, description, close },
		helpers: { addToast },
		states: { toasts },
		actions: { portal },
	} = createToaster<ToastData>();
</script>

<div class="fixed inset-0 grid items-end justify-center px-4 py-8 md:items-center">
	<div class="max-w-sm w-screen card bg-neutral text-neutral-content">
		<Form
			data={form}
			validationAdapter={zod(schema)}
			action={async ({ form }) => {
				// error = '';

				if (!form.valid || status === 'loading') {
					return;
				}

				try {
					status = 'loading';

					await sleep(500);

					// TODO
					const response = {
						error: {
							message: 'Login is not implemented yet',
						},
					};

					if (response.error) {
						throw new Error(response.error.message);
					}

					const redirectTo = data.redirectTo || '/';
					goto(redirectTo);
				} catch (err) {
					console.error(err);

					if (err instanceof Error) {
						// error = err.message;
						addToast({
							data: {
								title: 'Login failed',
								description: err.message,
								type: 'error',
							},
						});
					} else {
						// error = 'Something went wrong';
						addToast({
							data: {
								title: 'Login failed',
								description: 'Something went wrong. Please try again later.',
								type: 'error',
							},
						});
					}
				} finally {
					status = 'idle';
				}
			}}
			class="card-body"
			spa
		>
			<Input
				type="email"
				id="login-email"
				name="email"
				label="Email"
				placeholder="Email"
				disabled={status === 'loading'}
			/>

			<Input
				type="password"
				id="login-password"
				name="password"
				label="Password"
				placeholder="Password"
				disabled={status === 'loading'}
			/>

			<div class="mt-6 card-actions">
				<button
					type="submit"
					class="w-full btn btn-primary"
					disabled={status === 'loading'}
				>
					{#if status === 'loading'}
						<span class="loading loading-spinner"></span>
					{:else}
						Login
					{/if}
				</button>
			</div>
		</Form>
	</div>
</div>

<div
	class="toast toast-end"
	use:portal
>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="alert shadow-lg"
			class:alert-error={data.type === 'error'}
		>
			<div>
				<h3
					use:melt={$title(id)}
					class="font-semibold"
				>
					{data.title}
				</h3>
				<div use:melt={$description(id)}>
					{data.description}
				</div>
			</div>
			<button
				use:melt={$close(id)}
				class="btn btn-sm btn-error btn-circle"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				>
			</button>
		</div>
	{/each}
</div>

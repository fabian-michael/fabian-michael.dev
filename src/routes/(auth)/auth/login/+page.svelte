<script lang="ts">
	import { goto } from '$app/navigation';
	import { Form, Input } from '$components/form/index.js';
	import { sleep } from '$lib/utils.js';
	import { IconKey } from '@tabler/icons-svelte';
	import { superValidateSync } from 'sveltekit-superforms/client';
	import { schema } from './schema.js';

	export let data;

	const form = superValidateSync(schema);
	let status: 'initial' | 'idle' | 'loading' = 'initial';
	let error = '';
</script>

<div class="fixed inset-0 grid items-end justify-center px-4 py-8 md:items-center">
	<div class="max-w-sm card bg-neutral text-neutral-content">
		<Form
			{schema}
			action="{async ({ form }) => {
				if (!form.valid || status === 'loading') {
					return;
				}

				try {
					error = '';
					status = 'loading';

					await sleep(500);

					const response = await data.supabase.auth.signInWithPassword({
						email: form.data.email,
						password: form.data.password,
					});

					if (response.error) {
						throw new Error(response.error.message);
					}

					const redirectTo = data.redirectTo || '/';
					goto(redirectTo);
				} catch (err) {
					console.error(err);

					if (err instanceof Error) {
						error = err.message;
					} else {
						error = 'Something went wrong';
					}
				} finally {
					status = 'idle';
				}
			}}"
			data="{form}"
			class="card-body"
			spa
		>
			<div class="justify-center card-title"><IconKey /> Login</div>

			<Input
				type="email"
				id="login-email"
				name="email"
				label="Email"
				placeholder="Email"
				disabled="{status === 'loading'}"
			/>

			<Input
				type="password"
				id="login-password"
				name="password"
				label="Password"
				placeholder="Password"
				disabled="{status === 'loading'}"
			/>

			<div class="mt-6 card-actions">
				<button
					type="submit"
					class="w-full btn btn-primary"
					disabled="{status === 'loading'}"
				>
					{#if status === 'loading'}
						<span class="loading loading-spinner"></span>
					{:else}
						Login
					{/if}
				</button>

				{#if error}
					<p class="text-error">
						{error}
					</p>
				{/if}
			</div>
		</Form>
	</div>
</div>

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

<div class="grid min-h-screen place-content-center">
	<div class="max-w-sm card bg-neutral text-neutral-content">
		<Form
			{schema}
			action="{async ({ form }) => {
				if (!form.valid) {
					return;
				}

				try {
					error = '';
					status = 'loading';
					const response = await data.supabase.auth.signInWithPassword({
						email: form.data.email,
						password: form.data.password,
					});
					await sleep(500);

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
			let:errors
		>
			<div class="justify-center card-title"><IconKey /> Login</div>

			<Input
				type="email"
				id="login-email"
				name="email"
				label="Email"
				placeholder="Email"
			/>

			<Input
				type="password"
				id="login-password"
				name="password"
				label="Password"
				placeholder="Password"
			/>

			<div class="card-actions mt-6">
				<button
					type="submit"
					class="btn btn-primary w-full"
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

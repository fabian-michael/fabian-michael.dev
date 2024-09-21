<script lang="ts">
	import { page } from '$app/stores';
	import { Form, TextField } from '$components/form/index.js';
	import { userStore } from '$lib/client/stores/user-store.svelte.js';
	import { getFlash } from 'sveltekit-flash-message';
	import PhEnvelopeSimple from '~icons/ph/envelope-simple';
	import { schema } from './schema.js';

	const { data } = $props();
</script>

<section class="space-y-6">
	<header>
		<div class="text-2xl text-center">Login (Work in progress)</div>
	</header>
	<div class="shadow-lg card bg-base-100 card-compact sm:card-normal">
		<Form
			{schema}
			data={data.loginForm}
			action="/login"
			class="card-body"
			onResult={() => {
				userStore.fetchUser();
				getFlash(page).set({
					type: 'info',
					title: 'Wotk in progress',
					message: 'This is work in progress',
				});
			}}
			let:form
			let:submitting
		>
			<TextField
				{form}
				type="email"
				id="login-email"
				name="email"
				label="E-Mail"
				placeholder="E-Mail"
				icon={PhEnvelopeSimple}
				disabled={submitting}
				autocomplete="username"
			/>

			<div class="flex-col items-stretch mt-6 card-actions">
				<div class="flex items-center justify-between">
					<div class="form-control">
						<label class="cursor-pointer label">
							<input
								name="remember_me"
								type="checkbox"
								class="toggle toggle-sm"
								checked
							/>
							<span class="ml-2 text-xs label-text">Remember me</span>
						</label>
					</div>
				</div>
				<button
					type="submit"
					class="w-full btn btn-primary"
					disabled={submitting}
				>
					{#if submitting}
						<span class="loading loading-ball"></span>
					{:else}
						Login
					{/if}
				</button>

				<div
					role="separator"
					class="text-sm divider"
				>
					No access yet?
				</div>

				<a
					href="/auth/request-access"
					class="w-full btn btn-primary btn-outline"
				>
					Request access now
				</a>
			</div>
		</Form>
	</div>
</section>

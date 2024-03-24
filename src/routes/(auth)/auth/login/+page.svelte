<script lang="ts">
	import { Form, Textfield } from '$components/form/index.js';
	import { userStore } from '$lib/client/stores/user-store.svelte.js';
	import PhEnvelopeSimple from '~icons/ph/envelope-simple';
	import PhPassword from '~icons/ph/password';
	import { schema } from './schema.js';

	const { data } = $props();
</script>

<section class="space-y-6">
	<header>
		<div class="text-2xl text-center">Login</div>
	</header>
	<div class="shadow-lg card bg-base-100 card-compact sm:card-normal">
		<Form
			{schema}
			data={data.loginForm}
			action="/login"
			class="card-body"
			onResult={() => {
				userStore.fetchUser();
			}}
			let:form
			let:submitting
		>
			<Textfield
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

			<Textfield
				{form}
				type="password"
				id="login-password"
				name="password"
				label="Password"
				placeholder="Password"
				icon={PhPassword}
				disabled={submitting}
				autocomplete="current-password"
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

					<div>
						<a
							href=""
							class="text-xs link"
						>
							Forgot password
						</a>
					</div>
				</div>
				<button
					type="submit"
					class="w-full btn btn-primary"
					disabled={submitting}
				>
					{#if submitting}
						<span class="loading loading-spinner"></span>
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

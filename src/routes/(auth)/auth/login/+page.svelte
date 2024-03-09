<script lang="ts">
	import { Form, Input } from '$components/form/index.js';
	import { schema } from './schema.js';

	const { data } = $props();
</script>

<div class="fixed inset-0 z-0 grid items-end py-24 sm:items-center">
	<div class="w-full px-6 mx-auto max-w-screen-xs">
		<div class="shadow-lg card bg-base-100">
			<Form
				{schema}
				data={data.loginForm}
				action="/login"
				class="card-body"
				let:form
				let:submitting
			>
				<Input
					{form}
					type="email"
					id="login-email"
					name="email"
					label="Email"
					placeholder="Email"
					disabled={submitting}
				/>

				<Input
					{form}
					type="password"
					id="login-password"
					name="password"
					label="Password"
					placeholder="Password"
					disabled={submitting}
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
						class="divider"
					>
						OR
					</div>

					<a
						href=""
						class="w-full btn btn-secondary"
					>
						Request access
					</a>
				</div>
			</Form>
		</div>
	</div>
</div>

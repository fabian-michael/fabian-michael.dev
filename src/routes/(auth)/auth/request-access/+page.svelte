<script lang="ts">
	import { Captcha, Textarea, Textfield } from '$components/form';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import PhArrowLeft from '~icons/ph/arrow-left';
	import PhArrowRight from '~icons/ph/arrow-right';
	import PhBuildings from '~icons/ph/buildings';
	import PhEnvelopeSimple from '~icons/ph/envelope-simple';
	import PhGlobe from '~icons/ph/globe';
	import PhMapPin from '~icons/ph/map-pin';
	import PhPhone from '~icons/ph/phone';
	import PhUser from '~icons/ph/user';
	import { schemaClientStep1, schemaClientStep2 } from './schema-client.js';

	const { data } = $props();

	const steps = [schemaClientStep1, schemaClientStep2];
	const stepLabels = ['Contact', 'Company'];
	let step = $state(1);
	let schema = $derived(steps[step - 1] as typeof schemaClientStep2);
	const form = superForm(data.requestAccessForm, {
		dataType: 'json',
		onSubmit: ({ cancel, formElement }) => {
			if (step === steps.length) {
				return; // default form submission
			}

			cancel();
			if (formElement.reportValidity()) {
				step++;
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				step = 1;
			}
		},
	});

	const { enhance, submitting, capture, restore, options } = form;

	$effect(() => {
		options.validators = zod(schema);
	});

	export const snapshot = {
		capture: () => {
			const data = capture();

			// we don't want to store the captcha response
			data.data['cf-turnstile-response'] = '';

			return {
				step,
				data,
			};
		},
		restore: (snapshot) => {
			step = snapshot.step ?? 1;
			if (snapshot.data) restore(snapshot.data);
		},
	};
</script>

<section class="space-y-6">
	<header>
		<h1 class="text-2xl text-center">Request access (tbd)</h1>
	</header>
	<div class="shadow-lg card bg-base-100 card-compact sm:card-normal">
		<form
			use:enhance
			method="post"
			class="card-body"
		>
			<header class="space-y-4">
				<ul class="w-full steps">
					{#each steps as _, i}
						<li
							class="step after:font-symbols"
							class:step-secondary={step >= i + 1}
							data-content={step === i + 1 ? '\ue3c9' : step > i + 1 ? '\ue876' : ''}
						>
							{stepLabels[i]}
						</li>
					{/each}
				</ul>
			</header>

			{#if step === 1}
				<Textfield
					{form}
					type="text"
					name="full_name"
					label="Full name"
					placeholder="Full name"
					icon={PhUser}
					disabled={$submitting}
				/>

				<Textfield
					{form}
					type="email"
					name="email"
					label="Email"
					placeholder="Email"
					icon={PhEnvelopeSimple}
					disabled={$submitting}
					autocomplete="username"
				/>

				<Textfield
					{form}
					type="tel"
					name="phone"
					label="Phone"
					placeholder="Phone"
					icon={PhPhone}
					disabled={$submitting}
				/>
			{:else if step === 2}
				<Textfield
					{form}
					type="text"
					name="company"
					label="Company"
					placeholder="Company"
					icon={PhBuildings}
					disabled={$submitting}
				/>

				<Textfield
					{form}
					type="text"
					name="address"
					label="Company address"
					placeholder="Company address"
					icon={PhMapPin}
					disabled={$submitting}
				/>

				<Textfield
					{form}
					type="url"
					name="website"
					label="Company website"
					placeholder="Company website"
					icon={PhGlobe}
					disabled={$submitting}
				/>

				<Textarea
					{form}
					name="message"
					label="Message"
					placeholder="Message"
					disabled={$submitting}
				/>

				<Captcha
					{form}
					label="Prove you're not a robot"
				/>
			{/if}

			<div class="grid grid-cols-1 gap-2 mt-6 sm:grid-cols-2 card-actions">
				{#if step > 1}
					<button
						type="button"
						class="btn btn-primary btn-outline"
						onclick={() => step--}
						disabled={$submitting}
					>
						<PhArrowLeft class="inline-block" /> Back
					</button>
				{/if}

				<button
					type="submit"
					class="btn btn-primary"
					class:col-span-2={step === 1}
					disabled={$submitting}
				>
					{#if $submitting}
						<span class="loading loading-spinner"></span>
					{:else if step === steps.length}
						Request access
					{:else}
						Next <PhArrowRight class="inline-block" />
					{/if}
				</button>

				{#if step === 1}
					<div
						role="separator"
						class="col-span-2 text-sm divider"
					>
						Already have an account?
					</div>

					<a
						href="/auth/login"
						class="col-span-2 btn btn-primary btn-outline"
					>
						Go back to login
					</a>
				{/if}
			</div>
		</form>
	</div>
</section>

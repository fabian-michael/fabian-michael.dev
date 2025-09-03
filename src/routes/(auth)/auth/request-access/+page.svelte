<script lang="ts">
	import { page } from '$app/stores';
	import { Captcha, HiddenField, Textarea, TextField } from '$components/form';
	import { makeRequest } from '$lib/utils/fetch.js';
	import { safePromise } from '$lib/utils/safePromise.js';
	import { client } from '@passwordless-id/webauthn';
	import type { RegistrationJSON } from '@passwordless-id/webauthn/dist/esm/types.js';
	import { getFlash } from 'sveltekit-flash-message';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import FluentPersonPasskey20Regular from '~icons/fluent/person-passkey-20-regular';
	import MaterialSymbolsFingerprint from '~icons/material-symbols/fingerprint';
	import PhArrowLeft from '~icons/ph/arrow-left';
	import PhArrowRight from '~icons/ph/arrow-right';
	import PhBuildings from '~icons/ph/buildings';
	import PhCheckCircle from '~icons/ph/check-circle';
	import PhEnvelopeSimple from '~icons/ph/envelope-simple';
	import PhGlobe from '~icons/ph/globe';
	import PhMapPin from '~icons/ph/map-pin';
	import PhPhone from '~icons/ph/phone';
	import PhTrashFill from '~icons/ph/trash-fill';
	import PhUser from '~icons/ph/user';
	import PhUserCircle from '~icons/ph/user-circle';
	import { schemaClientStep1, schemaClientStep2, schemaClientStep3 } from './schema-client.js';

	// Props
	const { data } = $props();

	// Flash
	const flash = getFlash(page);

	// Constants
	const steps = [schemaClientStep1, schemaClientStep2, schemaClientStep3];
	const stepLabels = ['Contact', 'Company', 'Passkey'];
	const stepIcons = [PhUserCircle, PhBuildings, FluentPersonPasskey20Regular];

	// Form
	const form = superForm(data.requestAccessForm, {
		dataType: 'json',
		onSubmit: ({ cancel, formElement }) => {
			if (step === steps.length) {
				$flash = {
					type: 'info',
					title: 'Wotk in progress',
					message: 'This is work in progress',
				};
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
	const { enhance, submitting, capture, restore, options, form: formData, errors } = form;
	$inspect($errors);

	// State
	let step = $state(1);
	let schema = $derived(steps[step - 1] as typeof schemaClientStep3);
	let passkey = $state<RegistrationJSON | null>(null);
	let passkeyState = $state<'none' | 'adding' | 'added' | 'error'>('none');

	// Effects
	$effect(() => {
		options.validators = zod4(schema);
	});

	// Hooks
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

	// Handlers
	const handleAddPasskey = async () => {
		await form.validateForm();

		if (passkeyState === 'adding' || passkeyState === 'added' || $errors.passkey_name) {
			return;
		}

		passkeyState = 'adding';

		const [response, fetchChallengeError] = await safePromise(
			makeRequest<{ challenge: string }>('/api/webauthn/challenge', {
				headers: {
					Accept: 'application/json',
				},
			}),
		);

		if (fetchChallengeError) {
			passkeyState = 'error';
			return;
		}

		const [registration, registerError] = await safePromise(
			client.register({
				user: $formData.email,
				challenge: response.challenge,
				attestation: true,
				timeout: 60000,
			}),
			{
				logErrors: false,
			},
		);

		if (registerError) {
			const cause = registerError.cause as DOMException;
			console.error({
				name: cause.name,
				message: cause.message,
			});
			passkeyState = 'error';
			return;
		}

		passkey = registration;
		passkeyState = 'added';
	};
</script>

<section class="space-y-6">
	<header>
		<h1 class="text-center text-2xl">Request access (work in progresss)</h1>
	</header>
	<div class="card-compact sm:card-normal card bg-base-100 shadow-lg">
		<form use:enhance method="post" class="card-body">
			<header class="mb-6 space-y-4">
				<ul class="steps w-full">
					{#each steps as _, i}
						{@const Icon = stepIcons[i]}
						<li
							class="step after:font-symbols"
							class:step-secondary={step >= i + 1}
							data-content={step === i + 1 ? '\ue3c9' : step > i + 1 ? '\ue876' : ''}
						>
							<Icon class="mt-2" />
							{stepLabels[i]}
						</li>
					{/each}
				</ul>
			</header>

			{#if step === 1}
				<TextField
					{form}
					type="text"
					name="full_name"
					label="Full name"
					placeholder="Full name"
					icon={PhUser}
					disabled={$submitting}
				/>

				<TextField
					{form}
					type="email"
					name="email"
					label="Email"
					placeholder="Email"
					icon={PhEnvelopeSimple}
					disabled={$submitting}
					autocomplete="username"
				/>

				<TextField
					{form}
					type="tel"
					name="phone"
					label="Phone"
					placeholder="Phone"
					icon={PhPhone}
					disabled={$submitting}
				/>
			{:else if step === 2}
				<TextField
					{form}
					type="text"
					name="company"
					label="Company"
					placeholder="Company"
					icon={PhBuildings}
					disabled={$submitting}
				/>

				<TextField
					{form}
					type="text"
					name="address"
					label="Company address"
					placeholder="Company address"
					icon={PhMapPin}
					disabled={$submitting}
				/>

				<TextField
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
			{:else if step === 3}
				<p class="font-bold">What are passkeys?</p>
				<p>
					Passkeys offer a more secure and convenient authentication method, verifying
					your identity through biometric data (like fingerprints or face scans), device
					passwords, or PINs, making them a streamlined replacement for traditional
					passwords and two-factor authentication methods.
				</p>

				{#if passkeyState !== 'added'}
					<TextField
						{form}
						type="text"
						name="passkey_name"
						label="Passkey name"
						placeholder="Passkey name (e.g. iCloud)"
						icon={FluentPersonPasskey20Regular}
						disabled={$submitting || passkeyState === 'adding'}
					/>

					<button
						class="btn btn-secondary"
						onclick={handleAddPasskey}
						disabled={$submitting || passkeyState === 'adding'}
						type="button"
					>
						{#if passkeyState === 'adding'}
							<span class="loading loading-ball"></span>
						{:else}
							<MaterialSymbolsFingerprint /> Add Passkey
						{/if}
					</button>
				{:else}
					<p class="text-success">
						<PhCheckCircle class="inline-block" /> Passkey added
					</p>
					<table class="table w-full max-w-full table-xs">
						<thead>
							<tr>
								<th class="w-1/3 max-w-0 min-w-0 overflow-hidden text-ellipsis"
									>Name</th
								>
								<th class="w-1/3 max-w-0 min-w-0 overflow-hidden text-ellipsis"
									>Public Key</th
								>
								<th class="w-1/3 max-w-0 min-w-0 overflow-hidden text-ellipsis"
									>ID</th
								>
								<th class="w-8 min-w-0 px-0"></th>
							</tr>
						</thead>
						<tbody>
							<tr class="text-nowrap whitespace-nowrap">
								<td
									class="max-w-0 min-w-0 overflow-hidden text-ellipsis"
									title={$formData.passkey_name}
								>
									{$formData.passkey_name}
								</td>
								<td
									class="max-w-0 min-w-0 overflow-hidden text-ellipsis"
									title={$formData.passkey.publicKey}
								>
									{$formData.passkey.publicKey}
								</td>
								<td
									class="max-w-0 min-w-0 overflow-hidden text-ellipsis"
									title={$formData.passkey.id}
								>
									{$formData.passkey.id}
								</td>
								<td class="min-w-0 px-0">
									<button
										class="btn btn-circle btn-ghost btn-sm"
										onclick={() => {
											passkey = null;
											passkeyState = 'none';
										}}
										title="Remove passkey"
									>
										<PhTrashFill />
									</button>
								</td></tr
							>
						</tbody>
					</table>
				{/if}

				<HiddenField
					{form}
					name="passkey.algorithm"
					value={passkey?.response?.publicKeyAlgorithm ?? ''}
					showErrors={false}
				/>
				<HiddenField
					{form}
					name="passkey.publicKey"
					value={passkey?.response?.publicKey ?? ''}
					showErrors={false}
				/>
				<HiddenField
					{form}
					name="passkey.id"
					value={passkey?.id ?? ''}
					showErrors={false}
				/>

				{#if $errors.passkey?.algorithm || $errors.passkey?.id || $errors.passkey?.publicKey}
					<p class="text-error">Please add a passkey.</p>
				{/if}

				<Captcha {form} label="Prove you're not a robot" />
			{/if}

			<div class="mt-6 card-actions grid grid-cols-1 gap-2 sm:grid-cols-2">
				{#if step > 1}
					<button
						type="button"
						class="btn btn-outline btn-primary"
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
						<span class="loading loading-ball"></span>
					{:else if step === steps.length}
						Request access
					{:else}
						Next <PhArrowRight class="inline-block" />
					{/if}
				</button>

				{#if step === 1}
					<div role="separator" class="col-span-2 divider text-sm">
						Already have an account?
					</div>

					<a href="/auth/login" class="btn col-span-2 btn-outline btn-primary">
						Go back to login
					</a>
				{/if}
			</div>
		</form>
	</div>
</section>

<script lang="ts">
	import { Captcha, Form, Textarea, Textfield } from '$components/form';
	import PhArrowLeft from '~icons/ph/arrow-left';
	import PhArrowRight from '~icons/ph/arrow-right';
	import PhBuildings from '~icons/ph/buildings';
	import PhCheckCircle from '~icons/ph/check-circle';
	import PhEnvelopeSimple from '~icons/ph/envelope-simple';
	import PhGlobe from '~icons/ph/globe';
	import PhMapPin from '~icons/ph/map-pin';
	import PhPhone from '~icons/ph/phone';
	import PhUser from '~icons/ph/user';
	import { schemaClientStep1, schemaClientStep2 } from './schema-client.js';

	const { data } = $props();

	const steps = [schemaClientStep1, schemaClientStep2];
	let step = $state(1);
	let schema = $derived(steps[step - 1]);
</script>

<a
	href="/auth/login"
	class="mb-2 btn btn-sm btn-ghost"
>
	<PhArrowLeft class="inline-block" /> Back to login
</a>
<section class="shadow-lg card bg-base-100">
	<Form
		{schema}
		dataType="json"
		data={data.requestAccessForm}
		action="/login"
		class="card-body"
		onSubmit={({ cancel, formElement }) => {
			if (step === steps.length) {
				return; // default form submission
			}

			cancel();
			if (formElement.reportValidity()) {
				step++;
			}
		}}
		onUpdated={({ form }) => {
			if (form.valid) {
				step = 1;
			}
		}}
		let:form
		let:submitting
	>
		<header>
			<div class="justify-center card-title">Request Access (TBD)</div>
		</header>

		{#if step === 1}
			<Textfield
				{form}
				type="text"
				name="full_name"
				label="Full name"
				placeholder="Full name"
				icon={PhUser}
				disabled={submitting}
			/>

			<Textfield
				{form}
				type="email"
				name="email"
				label="Email"
				placeholder="Email"
				icon={PhEnvelopeSimple}
				disabled={submitting}
				autocomplete="username"
			/>

			<Textfield
				{form}
				type="tel"
				name="phone"
				label="Phone"
				placeholder="Phone"
				icon={PhPhone}
				disabled={submitting}
			/>
		{:else if step === 2}
			<Textfield
				{form}
				type="text"
				name="company"
				label="Company"
				placeholder="Company"
				icon={PhBuildings}
				disabled={submitting}
			/>

			<Textfield
				{form}
				type="text"
				name="address"
				label="Company address"
				placeholder="Company address"
				icon={PhMapPin}
				disabled={submitting}
			/>

			<Textfield
				{form}
				type="text"
				name="website"
				label="Company website"
				placeholder="Company website"
				icon={PhGlobe}
				disabled={submitting}
			/>

			<Textarea
				{form}
				name="message"
				label="Message"
				placeholder="Message"
				disabled={submitting}
			/>

			<Captcha
				{form}
				label="Prove you're not a robot"
			/>
		{/if}

		<div class="grid grid-cols-2 mt-6 card-actions">
			{#if step > 1}
				<button
					type="button"
					class="btn btn-ghost"
					onclick={() => step--}
					disabled={submitting}
				>
					<PhArrowLeft class="inline-block" /> Back
				</button>
			{/if}

			<button
				type="submit"
				class="col-start-2 btn btn-primary"
				disabled={submitting}
			>
				{#if submitting}
					<span class="loading loading-spinner"></span>
				{:else if step === steps.length}
					<PhCheckCircle class="inline-block" /> Request access
				{:else}
					Continue <PhArrowRight class="inline-block" />
				{/if}
			</button>
		</div>
	</Form>
</section>

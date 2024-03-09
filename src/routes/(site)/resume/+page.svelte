<script>
	import { Avatar } from '$components/avatar';
	import { Timeline } from '$components/timeline';
	import { format, parseISO } from 'date-fns';
	import PhAddressBook from '~icons/ph/address-book';
	import PhBriefcase from '~icons/ph/briefcase';
	import PhEnvelopeSimple from '~icons/ph/envelope-simple';
	import PhGraduationCap from '~icons/ph/graduation-cap';
	import PhMapPin from '~icons/ph/map-pin';
	import PhPhone from '~icons/ph/phone';
	import PhUserFocus from '~icons/ph/user-focus';

	const { data } = $props();
</script>

<div class="container">
	<div class="flex flex-col gap-48 xl:flex-row">
		<div class="flex-1 min-w-[300px]">
			<div class="flex flex-col gap-16 xl:sticky xl:top-16">
				{#if data.contact.avatar}
					<div class="w-full max-w-xs mx-auto overflow-hidden shadow-2xl aspect-square rounded-3xl">
						<Avatar
							src={data.contact.avatar.url}
							name="Fabian Michael"
							size="fill"
						/>
					</div>
				{/if}

				<section class="max-w-xs">
					<div class="prose prose-a:no-underline">
						<h2>
							<PhAddressBook class="inline-block" />
							<span class="align-middle">Contact</span>
						</h2>

						<p class="pl-[1.45em] -indent-[1.45em]">
							<PhMapPin class="inline-block mr-1" /><span class="align-middle">
								{data.contact.address}
							</span>
						</p>
						<p class="pl-[1.45em] -indent-[1.45em]">
							<PhPhone class="inline-block mr-1" /><a
								class="align-middle"
								href="tel:{data.contact.phone}"
								title=""
							>
								{data.contact.phone}
							</a>
						</p>
						<p class="pl-[1.45em] -indent-[1.45em]">
							<PhEnvelopeSimple class="inline-block mr-1" /><a
								class="align-middle"
								href="mailto:{data.contact.email}"
								title=""
							>
								{data.contact.email}
							</a>
						</p>
					</div>
				</section>

				<section>
					<div class="prose"></div>
				</section>
			</div>
		</div>

		<div class="flex flex-col flex-auto gap-16">
			<section>
				<div class="prose">
					<h1 class="text-4xl md:text-6xl">FABIAN MICHAEL</h1>
					<p class="-mt-8 text-xl">{data.about.job_title}</p>

					<hr />

					<h2>
						<PhUserFocus class="inline-block" />
						<span class="align-middle">Profile</span>
					</h2>

					{@html data.about.profile_html}
				</div>
			</section>

			<section>
				<div class="prose">
					<h2>
						<PhBriefcase class="inline-block" />
						<span class="align-middle">Experience</span>
					</h2>
					<div class="not-prose">
						<Timeline
							items={data.experience.entries.map((entry) => ({
								title: entry.job_title,
								date: `${format(parseISO(entry.start_date), 'MMMM yyyy')} - ${entry.end_date ? format(parseISO(entry.end_date), 'MMMM yyyy') : 'NOW'}`,
								content: entry.description_html,
								location: entry.company,
							}))}
						/>
					</div>
				</div>
			</section>

			<section>
				<div class="prose">
					<h2>
						<PhGraduationCap class="inline-block" />
						<span class="align-middle">Education</span>
					</h2>
					<div class="not-prose">
						<Timeline
							items={data.education.entries.map((entry) => ({
								title: entry.title,
								date: `${format(parseISO(entry.start_date), 'MMMM yyyy')} - ${format(parseISO(entry.end_date), 'MMMM yyyy')}`,
								content: entry.description_html,
								location: entry.institution,
							}))}
						/>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

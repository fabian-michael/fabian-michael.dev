<script>
	import { Avatar } from '$components/avatar';
	import { Timeline } from '$components/timeline';
	import {
		IconAddressBook,
		IconBriefcase,
		IconMail,
		IconMapPin,
		IconPhone,
		IconSchool,
		IconUserScan,
		IconWorld,
	} from '@tabler/icons-svelte';
</script>

<div class="container">
	<div class="flex flex-col gap-48 xl:flex-row">
		<div class="flex flex-col gap-16 flex-1 min-w-[300px]">
			<div class="w-full max-w-xs mx-auto aspect-square">
				<Avatar
					name="Fabian Michael"
					size="fill"
				/>
			</div>

			<section class="max-w-xs">
				<div class="prose">
					<h2 class="relative pl-12">
						<IconAddressBook
							class="absolute left-0 inline-block align-middle"
							size="1.3333em"
						/>
						<span class="align-middle">Contact</span>
					</h2>

					<p class="relative pl-8">
						<IconMapPin class="absolute left-0 inline-block" />
						Adlerstr. 75, 14612 Falkensee, Brandenburg, Germany
					</p>
					<p class="relative pl-8">
						<IconPhone class="absolute left-0 inline-block" />
						<a
							href="tel:+4917622214373"
							title=""
						>
							(+49) 176 222 143 73
						</a>
					</p>
					<p class="relative pl-8">
						<IconMail class="absolute left-0 inline-block" />
						<a
							href="mailto:hello@fabian-michael.dev"
							title=""
						>
							hello@fabian-michael.dev
						</a>
					</p>
					<p class="relative pl-8">
						<IconWorld class="absolute left-0 inline-block" />
						<a
							href="https://fabian-michael.dev"
							title=""
						>
							fabian-michael.dev
						</a>
					</p>
				</div>
			</section>

			<section>
				<div class="prose"></div>
			</section>
		</div>

		<div class="flex flex-col flex-auto gap-16">
			<section>
				<div class="prose">
					<h1 class="text-4xl md:text-6xl">FABIAN MICHAEL</h1>
					<p class="text-xl -mt-8">FULL STACK WEB DEVELOPER</p>

					<hr />

					<h2 class="relative pl-12">
						<IconUserScan
							class="absolute left-0 inline-block align-middle"
							size="1.3333em"
						/>
						<span class="align-middle">Profile</span>
					</h2>
					<ul>
						<li>Passionate web developer</li>
						<li>Started my journey when I was around 12 years old</li>
						<li>
							Acquired comprehensive knowledge of web development through self-directed learning and
							hands-on experience.
						</li>
						<li>
							Continuously engage in personal education to stay up-to-date with the latest web development
							technologies and best practices.
						</li>
					</ul>
				</div>
			</section>

			<section>
				<div class="prose">
					<h2 class="relative pl-12 mb-[1em]">
						<IconBriefcase
							class="absolute left-0 inline-block align-middle"
							size="1.3333em"
						/>
						<span class="align-middle">Experience</span>
					</h2>
				</div>
				<Timeline
					items="{[
						{
							title: 'Full Stack Web Developer',
							date: '2020 - NOW',
							content:
								'Since I completed my apprenticeship, I have been working as a full stack web developer at form4 GmbH & Co. KG. I am responsible for the development of various web applications and websites. I am also responsible for the maintenance and further development of existing projects.',
							location: 'form4 GmbH & Co. KG, Berlin',
						},
						{
							title: 'Auxiliary Scientist',
							date: '2017 - 2018',
							content:
								'While studying at BHT, I worked as a student assistant at Fraunhofer FOKUS. There I learned a lot about automated testing and test automation.',
							location: 'Fraunhofer FOKUS, Berlin',
						},
					]}"
				/>
			</section>

			<section>
				<div class="prose">
					<h2 class="relative pl-12 mb-[1em]">
						<IconSchool
							class="absolute left-0 inline-block align-middle"
							size="1.3333em"
						/>
						<span class="align-middle">Education</span>
					</h2>
				</div>

				<Timeline
					items="{[
						{
							title: 'Apprenticeship as "IT Specialist for Application Development"',
							date: '2018 - 2020',
							location: 'OSZ IMT, Berlin – and – form4 GmbH & Co. KG, Berlin',
							content:
								'I completed my apprenticeship as an IT specialist for application development at OSZ IMT and form4 GmbH & Co. KG. During my apprenticeship I was able to gain a lot of experience in the field of web development and software engineering. I was able to work on various projects and gain experience in the areas of frontend, backend and DevOps.',
						},
						{
							title: 'Media Computer Science',
							date: '2017 - 2018',
							location: 'BHT, Berlin',
							content: 'Not completed but noteworthy – Decided to complete an apprenticeship instead',
						},
						{
							title: 'Computer Science',
							date: '2015 - 2017',
							location: 'TU, Berlin',
							content: 'Not completed but noteworthy – Changed to BHT to study Media Computer Science',
						},
						{
							title: 'Baccalaureate',
							date: '2012 - 2015',
							location: 'OSZ TIEM, Berlin',
							content: 'Completed with a focus on mathematics and computer science',
						},
					]}"
				/>
			</section>
		</div>
	</div>
</div>

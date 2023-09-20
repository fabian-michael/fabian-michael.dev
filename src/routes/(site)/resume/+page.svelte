<script>
	import { Avatar } from '$components/avatar';
	import {
		IconBriefcase,
		IconCircleX,
		IconDiscountCheck,
		IconMail,
		IconMapPin,
		IconPhone,
		IconSchool,
		IconWorld,
	} from '@tabler/icons-svelte';
</script>

<div class="container">
	<div class="mb-16 prose">
		<h1>Resume</h1>
	</div>

	<div class="flex flex-col gap-16 md:flex-row">
		<div class="flex flex-col gap-16">
			<div class="w-full max-w-xs mx-auto aspect-square">
				<Avatar
					name="Fabian Michael"
					size="fill"
				/>
			</div>
			<article class="max-w-xs prose">
				<h3>CONTACT</h3>
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
			</article>
		</div>

		<div class="flex flex-col flex-1 gap-16">
			<article class="prose">
				<h2 class="relative pl-12">
					<IconBriefcase
						class="absolute left-0 inline-block align-middle"
						size="1.3333em"
					/>
					<span class="align-middle">PROFESSIONAL EXPERIENCE</span>
				</h2>
				<ul>
					<li>Full Stack Web Developer, form4 GmbH & Co. KG</li>
					<li>Auxiliary Scientist, Fraunhofer FOKUS</li>
				</ul>
			</article>

			<article class="prose">
				<h2 class="relative pl-12">
					<IconSchool
						class="absolute left-0 inline-block align-middle"
						size="1.3333em"
					/>
					<span class="align-middle">EDUCATION</span>
				</h2>
				<p>Self-taught full stack web developer</p>
				<ul>
					<li>Started my journey when I was around 12 years old</li>
					<li>
						Acquired comprehensive knowledge of web development through self-directed learning and hands-on
						experience.
					</li>
					<li>
						Continuously engage in personal education to stay up-to-date with the latest web development
						technologies and best practices.
					</li>
				</ul>
				<p>Academic education</p>
				<ul>
					<li>
						<span class="font-semibold">OSZ IMT Berlin</span> and
						<span class="font-semibold">form4 GmbH & Co. KG</span><br />
						Apprenticeship as "IT Specialist for Application Development"<br />
						<small class="text-success-500">
							<IconDiscountCheck
								class="inline-block align-middle"
								size="1.5em"
							/>
							<span class="align-middle">completed</span>
						</small>
					</li>
					<li>
						<span class="font-semibold">BHT Berlin</span><br />
						Media Computer Science<br />
						<small class="text-error-500">
							<IconCircleX
								class="inline-block align-middle"
								size="1.5em"
							/>
							<span class="align-middle">not completed</span>
						</small>
					</li>
					<li>
						<span class="font-semibold">TU Berlin</span><br />
						Computer Science<br />
						<small class="text-error-500">
							<IconCircleX
								class="inline-block align-middle"
								size="1.5em"
							/>
							<span class="align-middle">not completed</span>
						</small>
					</li>
					<li>
						<span class="font-semibold">OSZ TIEM Berlin</span><br />
						Baccalaureate (Maths, Computer Science)<br />
						<small class="text-success-500">
							<IconDiscountCheck
								class="inline-block align-middle"
								size="1.5em"
							/>
							<span class="align-middle">completed</span>
						</small>
					</li>
				</ul>
			</article>
		</div>
	</div>
</div>

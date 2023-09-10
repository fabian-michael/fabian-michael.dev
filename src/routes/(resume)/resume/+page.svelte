<script>
	import { BadgeCheck, Briefcase, Globe2, GraduationCap, Mail, MapPin, Phone, XCircle } from 'lucide-svelte';
</script>

<div class="container">
	<div class="flex">
		<div class="flex flex-col flex-1 gap-16">
			<article class="prose">
				<h2 class="relative pl-12">
					<Briefcase
						class="absolute left-0 inline-block align-middle"
						size="1.3333em"
					/> <span class="align-middle">PROFESSIONAL EXPERIENCE</span>
				</h2>
				<ul>
					<li>Full Stack Web Developer, form4 GmbH & Co. KG</li>
					<li>Auxiliary Scientist, Fraunhofer FOKUS</li>
				</ul>
			</article>

			<article class="prose">
				<h2 class="relative pl-12">
					<GraduationCap
						class="absolute left-0 inline-block align-middle"
						size="1.3333em"
					/> <span class="align-middle">EDUCATION</span>
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
							<BadgeCheck
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
							<XCircle
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
							<XCircle
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
							<BadgeCheck
								class="inline-block align-middle"
								size="1.5em"
							/>
							<span class="align-middle">completed</span>
						</small>
					</li>
				</ul>
			</article>
		</div>

		<div class="flex flex-col gap-16">
			<div
				class="aspect-square w-[320px] flex items-center justify-center border-2 border-surface-100-800-token rounded-full"
			>
				<div
					class="aspect-square w-[256px] flex items-center justify-center border-2 border-surface-100-800-token rounded-full"
				>
					<!-- <Avatar
						src="https://i.pravatar.cc/128"
						width="w-[192px]"
					/> -->
				</div>
			</div>
			<article class="max-w-xs prose">
				<h3>CONTACT</h3>
				<p class="relative pl-8">
					<MapPin class="absolute left-0 inline-block" /> Adlerstr. 75, 14612 Falkensee, Brandenburg, Germany
				</p>
				<p class="relative pl-8">
					<Phone class="absolute left-0 inline-block" />
					<a
						href="tel:+4917622214373"
						title=""
					>
						(+49) 176 222 143 73
					</a>
				</p>
				<p class="relative pl-8">
					<Mail class="absolute left-0 inline-block" />
					<a
						href="mailto:hello@fabian-michael.dev"
						title=""
					>
						hello@fabian-michael.dev
					</a>
				</p>
				<p class="relative pl-8">
					<Globe2 class="absolute left-0 inline-block" />
					<a
						href="https://fabian-michael.dev"
						title=""
					>
						fabian-michael.dev
					</a>
				</p>
			</article>
		</div>
	</div>
</div>

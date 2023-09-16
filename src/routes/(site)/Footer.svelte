<script lang="ts">
	import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconBrandXing } from '@tabler/icons-svelte';
</script>

<footer class="rounded footer footer-center gap-y-6 pb-6 bg-base-200 text-base-content sticky top-[100vh]">
	<div class="w-full py-4 bg-primary text-primary-content">
		<ul class="flex items-center justify-center gap-8 text-4xl">
			<li>
				<a
					class="inline-flex items-center gap-2 hover:text-white"
					href="https://twitter.com/fabianmichael95"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconBrandX size="1em" />
				</a>
			</li>
			<li>
				<a
					class="inline-flex items-center gap-2 hover:text-white"
					href="https://www.linkedin.com/in/fabian-michael-97a48b1a3/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconBrandLinkedin size="1em" />
				</a>
			</li>
			<li>
				<a
					class="inline-flex items-center gap-2 hover:text-white"
					href="https://www.xing.com/profile/Fabian_Michael2/cv"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconBrandXing size="1em" />
				</a>
			</li>
			<li>
				<a
					class="inline-flex items-center gap-2 hover:text-white"
					href="https://github.com/fabian-michael"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconBrandGithub size="1em" />
				</a>
			</li>
		</ul>
	</div>

	<div class="grid grid-flow-col gap-4">
		<a
			class="link link-hover"
			href="/about">About me</a
		>
		<a
			class="link link-hover"
			href="/blog">Blog</a
		>
		<a
			class="link link-hover"
			href="mailto:bucolic-ductile0d@icloud.com?subject=Hi%20Fabian%20%F0%9F%91%8B">Contact</a
		>
		<a
			class="link link-hover"
			href="/legal-notice">Legal notice</a
		>
	</div>

	<div class="flex items-center justify-center w-full gap-8">
		<span class="text-center">
			powered by
			<a
				href="https://kit.svelte.dev"
				target="_blank"
				class="font-normal font-[Overpass] inline-block"
			>
				<img
					src="/images/svelte-logo.svg"
					alt="Svelte logo"
					class="inline-block h-6"
				/> SVELTE KIT
			</a>
		</span>

		<span class="text-center">
			hosted on <a
				href="https://vercel.com"
				target="_blank"
				title="Vercel"
				class="inline-block"
				><img
					src="/images/vercel-logotype-light.svg"
					alt="Vercel logo"
					class="inline-block h-4 cursor-pointer select-none"
				/></a
			>
		</span>
	</div>

	<div>
		<p>Copyright © 2023 - All right reserved by Fabian Michael</p>
	</div>
</footer>

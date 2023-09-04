<script>
	import { Avatar } from '$components/avatar';
	import { IconBuildingSkyscraper } from '@tabler/icons-svelte';
</script>

<div class="py-16 space-y-16">
	<div class="container">
		<div class="max-w-lg space-y-6">
			<Avatar
				src="https://avatars.githubusercontent.com/u/26723386?v=4"
				name="Fabian Michael"
				size="large"
			/>
			<div class="">
				<h1 class="text-6xl font-semibold leading-tight">
					hi, I'm <span class="text-primary">Fabian</span>
				</h1>
			</div>
			<p>
				<small class="inline-flex items-center gap-2">
					<IconBuildingSkyscraper size="{18}" />
					<a
						class="link link-hover"
						href="https://form4.de"
						target="_blank"
						rel="noopener noreferrer"
					>
						form4 GmbH & Co. KG, Berlin
					</a>
				</small>
			</p>
			<p>Full Stack Developer with a passion for building beautiful and functional user interfaces.</p>
			<a
				href="mailto:bucolic-ductile0d@icloud.com?subject=Hi%20Fabian%20%F0%9F%91%8B"
				class="btn btn-primary"
			>
				Get in touch
			</a>
		</div>
	</div>
</div>

<script lang="ts">
	import { Avatar } from '$components/avatar';
	import { PUBLIC_PAYLOAD_BASE } from '$env/static/public';
	import { buildUrl } from '$lib/utils';
	export let data;
</script>

<svelte:head>
	<title>{data.general.title} | Fabian Michael</title>
</svelte:head>

<section class="my-12">
	<div class="container flex flex-wrap items-center justify-between gap-12">
		<div class="flex-1 prose">
			{@html data.hero.text_html}
		</div>
		<div class="w-full px-8 sm:px-0 sm:w-2/5 lg:w-1/4 shrink-0 avatar-wrapper">
			<div class="w-full overflow-hidden shadow-2xl aspect-square rounded-3xl">
				<Avatar
					name="Fabian Michael"
					src={buildUrl([PUBLIC_PAYLOAD_BASE, data.hero.image.sizes.square.url])}
					size="fill"
				/>
			</div>
		</div>
	</div>
</section>

<section class="my-12">
	<div class="container">
		<div class="prose">
			<h2>Recent blog postings (TBD)</h2>
		</div>

		<div class="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each Array(4) as _, index}
				<div class="flex flex-col w-full gap-4">
					<div class="w-full aspect-video skeleton"></div>
					<div class="h-4 skeleton w-28"></div>
					<div class="w-full h-4 skeleton"></div>
					<div class="w-4/5 h-4 skeleton"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	.avatar-wrapper {
		transform-style: preserve-3d;
		--rotateX: 0deg;
		--rotateY: 0deg;
		--rotateZ: 0deg;
		transform: perspective(500px) rotateX(var(--rotateX)) rotateY(var(--rotateY)) rotateZ(var(--rotateZ));
	}

	@screen sm {
		.avatar-wrapper {
			--rotateX: -5deg;
			--rotateY: -15deg;
			--rotateZ: -2deg;
		}
	}
</style>

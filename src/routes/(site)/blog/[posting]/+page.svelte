<script lang="ts">
	import { Prose } from '$components/prose';
	import { PUBLIC_PAYLOAD_BASE } from '$env/static/public';
	import { buildUrl } from '$lib/utils';
	import { formatDistanceToNow, parseISO } from 'date-fns';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data.title} | Fabian Michael</title>
	<meta
		name="description"
		content={data.abstract}
	/>
</svelte:head>

<section class="my-12">
	<header class="my-12">
		<div class="container">
			<Prose centered>
				<h1>{data.title}</h1>
				<p>
					<time datetime={data.createdAt}>
						<small>
							posted {formatDistanceToNow(parseISO(data.createdAt))} ago
						</small>
					</time>
				</p>
				{#if data.image}
					<img
						id="header-image"
						class="object-cover aspect-video"
						src={buildUrl([PUBLIC_PAYLOAD_BASE, data.image.url])}
						alt={data.title}
					/>
				{/if}
			</Prose>
		</div>
	</header>

	<div class="container">
		<Prose centered>
			{@html data.text_html}
		</Prose>
	</div>
</section>

<style>
</style>

<script lang="ts">
	import { Avatar } from '$components/avatar';
	import { Prose } from '$components/prose/index.js';
	import { formatDistanceToNow, parseISO } from 'date-fns';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data?.general?.title} | Fabian Michael</title>
</svelte:head>

<section>
	<div class="container flex flex-wrap items-center justify-between gap-12">
		{#if data?.hero?.text_html}
			<Prose class="flex-1">
				{@html data.hero.text_html}
			</Prose>
		{/if}
		{#if data?.hero?.image?.sizes?.square?.url}
			<div class="w-full px-8 sm:px-0 sm:w-2/5 lg:w-1/4 shrink-0 avatar-wrapper">
				<div class="w-full overflow-hidden shadow-2xl aspect-square rounded-3xl">
					<Avatar
						name="Fabian Michael"
						src={data.hero.image.sizes.square.url}
						size="fill"
					/>
				</div>
			</div>
		{/if}
	</div>
</section>

<section>
	<div class="container">
		<Prose class="prose-a:no-underline">
			<h2>Recent blog postings</h2>
			<p>
				Explose my recent blog postings, where I unravel the latest trends, hacks, and breakthroughs in web
				development. Dive right in and level up your coding game!
			</p>
		</Prose>

		<div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
			{#await data.blogPostings}
				{#each Array(3) as _}
					<div class="w-full space-y-4">
						<div class="w-full aspect-video skeleton rounded-xl"></div>
						<div class="w-10/12 h-4 skeleton"></div>
						<div class="w-full h-4 skeleton"></div>
						<div class="w-full h-4 skeleton"></div>
					</div>
				{/each}
			{:then blogPostings}
				{#each blogPostings?.docs ?? [] as blogPosting}
					<article class="w-full space-y-4 blog-posting">
						<header class="space-y-4">
							<a
								class="block overflow-hidden aspect-video rounded-xl"
								href="/blog/{blogPosting.slug}"
							>
								<img
									class="block object-cover my-0 size-full"
									src={blogPosting.image.url}
									alt={blogPosting.title}
								/>
							</a>
							<div class="font-bold">
								<a
									class="title"
									href="/blog/{blogPosting.slug}"
								>
									{blogPosting.title}
								</a>
							</div>
						</header>

						<div>
							{blogPosting.abstract}
						</div>

						<div>
							<time datetime={blogPosting.createdAt}>
								<small>
									{formatDistanceToNow(parseISO(blogPosting.createdAt))} ago
								</small>
							</time>
						</div>
					</article>
				{:else}
					<p>There are no blog postings yet.</p>
				{/each}
			{/await}
		</div>
	</div>
</section>

<style lang="postcss">
	.avatar-wrapper {
		transform-style: preserve-3d;
		--translateX: 0;
		--rotateY: 0deg;
		--rotateZ: 0deg;
		transform: perspective(500px) rotateY(var(--rotateY)) rotateZ(var(--rotateZ)) translateX(var(--translateX));
	}

	@screen sm {
		.avatar-wrapper {
			--translateX: -20px;
			--rotateY: -15deg;
			--rotateZ: -2deg;
		}
	}

	.blog-posting {
		img {
			@apply transition-all;
		}

		&:has(a:hover) {
			.title {
				@apply underline;
			}
			img {
				scale: 1.05;
			}
		}
	}
</style>

<script lang="ts">
	import { cn } from '$lib/utils';

	interface TimelineItem {
		title: string;
		date: string;
		content: string;
		location?: string;
	}

	export let items: TimelineItem[] = [];
</script>

<ol class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
	{#each items as item, i (item.date)}
		<li>
			{#if i > 0}
				<hr />
			{/if}
			<div class="timeline-middle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					class="w-5 h-5"
				>
					<circle
						cx="10"
						cy="10"
						r="6"
						fill="none"
						stroke="currentColor"
						stroke-width="4"
					/>
				</svg>
			</div>
			<div
				class={cn('mb-10 space-y-4', {
					'timeline-start md:text-end mr-4': i % 2 === 0,
					'timeline-end ml-4': i % 2 === 1,
				})}
			>
				<p>
					<time class="font-mono italic">{item.date}</time>
				</p>
				<p class="text-lg font-black">{item.title}</p>
				<div class="prose">
					{@html item.content}
				</div>
			</div>
			<hr />
		</li>
	{/each}
</ol>

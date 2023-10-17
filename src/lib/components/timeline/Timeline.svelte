<script lang="ts">
	interface TimelineItem {
		title: string;
		date: string;
		content: string;
		location?: string;
	}

	export let items: TimelineItem[] = [];
</script>

<div class="relative">
	<div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-neutral z-0">
		<div class="absolute bottom-full w-1 h-1 border-4 border-transparent border-b-neutral"></div>
		<div class="absolute top-full w-1 h-1 border-4 border-neutral border-b-transparent"></div>
	</div>

	<ol class="relative list-none grid grid-flow-row auto-rows-auto gap-12">
		{#each items as item, i}
			<li class="grid grid-cols-[1fr_auto_1fr] gap-12 items-center">
				{#if i % 2 === 1}
					<div class="text-right">
						<p class="text-lg font-medium">
							{item.date}
						</p>
					</div>

					<div class="rounded-full w-4 h-4 bg-neutral mx-auto p-1">
						<div class="w-2 h-2 bg-base-100 rounded-full"></div>
					</div>

					<div class="prose">
						<h3>
							{item.title}
						</h3>
						<p>
							{item.content}
						</p>
						{#if item.location}
							<p>
								{item.location}
							</p>
						{/if}
					</div>
				{/if}

				{#if i % 2 === 0}
					<div class="prose">
						<h3>
							{item.title}
						</h3>
						<p>
							{item.content}
						</p>
						{#if item.location}
							<p>
								{item.location}
							</p>
						{/if}
					</div>

					<div class="rounded-full w-4 h-4 bg-neutral mx-auto p-1">
						<div class="w-2 h-2 bg-base-100 rounded-full"></div>
					</div>

					<div>
						<p class="text-lg font-medium">
							{item.date}
						</p>
					</div>
				{/if}
			</li>
		{/each}
	</ol>
</div>

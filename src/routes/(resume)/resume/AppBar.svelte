<script lang="ts">
	import { ThemeSelect } from '$lib/components/theme-select';

	const title = 'Fabian Michael';
	const subtitle = 'Full Stack Developer';
</script>

<div class="bg-surface-100-800-token">
	<div class="container flex items-center py-4">
		<div class="flex-1">
			<h1 class="mb-2 font-bold h1">
				{title}
			</h1>
			<p>{subtitle.toUpperCase()}</p>
		</div>

		<div>
			<ThemeSelect />
		</div>
	</div>
</div>

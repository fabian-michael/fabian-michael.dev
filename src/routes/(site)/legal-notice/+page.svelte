<script>
	import { Prose } from '$components/prose';

	export let data;
</script>

<svelte:head>
	<title>{data.title} | Fabian Michael</title>
</svelte:head>

<section>
	<header class="mb-12">
		<div class="container">
			<Prose centered>
				<h1>{data.title}</h1>
			</Prose>
		</div>
	</header>

	<div class="container">
		<Prose centered>
			{@html data.text_html}
		</Prose>
	</div>
</section>

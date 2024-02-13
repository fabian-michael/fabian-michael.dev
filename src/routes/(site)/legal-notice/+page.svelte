<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title} | Fabian Michael</title>
</svelte:head>

<section class="my-12">
	<header class="my-12">
		<div class="container">
			<div class="prose">
				<h1>{data.title}</h1>
			</div>
		</div>
	</header>

	<div class="container">
		<div class="prose">
			{@html data.text_html}
		</div>
	</div>
</section>

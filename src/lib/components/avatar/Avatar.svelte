<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	const avatar = tv({
		base: 'avatar bg-base-100 text-primary font-semibold rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden',
		variants: {
			size: {
				small: 'w-4 h-4',
				medium: 'w-12 h-12',
				large: 'w-24 h-24',
				fill: 'w-full h-full',
			},
		},
	});

	interface $$Props extends VariantProps<typeof avatar> {
		src?: string;
		name: string;
	}

	export let size: $$Props['size'] = 'medium';
	export let src: string = '';
	export let name: string;

	$: initials = name
		.split(' ')
		.map((word) => word[0].toUpperCase())
		.join('');

	const {
		elements: { fallback, image },
		states: { loadingStatus },
	} = createAvatar({
		src,
	});
</script>

<div
	class="{avatar({ size })}"
	class:placeholder="{$loadingStatus !== 'loaded'}"
>
	<div class="w-full h-full">
		<img
			use:melt="{$image}"
			alt="{name} avatar"
		/>
		<span
			class="block"
			use:melt="{$fallback}">{initials}</span
		>
	</div>
</div>

<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';
	import { cva, type VariantProps } from 'class-variance-authority';

	const avatar = cva(
		'bg-neutral-focus text-neutral-content rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2',
		{
			variants: {
				size: {
					small: 'w-4 h-4',
					medium: 'w-12 h-12',
					large: 'w-24 h-24',
				},
			},
		},
	);

	interface $$Props extends VariantProps<typeof avatar> {
		src: string;
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
	class="avatar"
	class:placeholder="{$loadingStatus !== 'loaded'}"
>
	<div class="{avatar({ size })}">
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

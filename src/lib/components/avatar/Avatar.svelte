<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	const avatar = tv({
		base: 'avatar bg-base-100 text-primary font-semibold overflow-hidden',
		variants: {
			size: {
				small: 'size-4',
				medium: 'size-12',
				large: 'size-24',
				fill: 'size-full',
			},
		},
	});

	type AvatarProps = VariantProps<typeof avatar> & {
		src?: string;
		name: string;
	};

	const { name, src = '', size = 'medium' } = $props<AvatarProps>();

	const initials = $derived(
		name
			.split(' ')
			.map((word) => word[0].toUpperCase())
			.join(''),
	);

	const {
		elements: { fallback, image },
		states: { loadingStatus },
	} = createAvatar({
		src,
	});
</script>

<div
	class={avatar({ size })}
	class:placeholder={$loadingStatus !== 'loaded'}
>
	<div class="w-full h-full">
		<img
			use:melt={$image}
			alt={name}
		/>
		<span
			class="block"
			use:melt={$fallback}>{initials}</span
		>
	</div>
</div>

<script lang="ts">
	interface Props {
		alt?: string;
		src: string;
	}

	const { alt, src }: Props = $props();
</script>

<img {alt} {src} />

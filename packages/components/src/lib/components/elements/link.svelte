<script lang="ts">
	import '../../css/color.css';
	import '../../css/size.css';

	export let href: string | undefined = undefined;
	export let title: string | null | undefined = undefined;
</script>

<a {href} {title}><slot /></a>

<style>
	a {
		color: var(--st-color-blue-500);
		text-underline-offset: var(--st-size-1);
		text-decoration-line: underline;
	}
	a:hover {
		text-decoration-thickness: var(--st-size-0_5);
	}
</style>

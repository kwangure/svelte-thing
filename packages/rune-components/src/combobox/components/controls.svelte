<script lang="ts">
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps}>
	{@render children?.()}
</div>

<style>
	@layer component {
		div {
			--_border-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-600);
			border: 1px solid
				var(--_border-color-dark, var(--st-color-neutral-300));
			border-radius: var(--st-size-1);
			display: flex;
			transition:
				border-color 0.25s ease,
				box-shadow 0.25s ease-out;
		}
		div:hover:not(:focus-within) {
			--_box-shadow-dark: var(--st-color-preference-dark) 0 0 0px 2px
				rgb(135 205 255 / 30%);
			--_box-shadow: 0 0 0px 2px hsl(215deg 100% 90%);
			box-shadow: var(--_box-shadow-dark, var(--_box-shadow));
			--_border-color-dark: hsl(225deg 100% 60%);
			border: 1px solid var(--_border-color-dark, hsl(225deg 100% 55%));
		}
		div:focus-within {
			--_box-shadow-dark: var(--st-color-preference-dark) 0 0 0px 1px
				hsl(225deg 100% 60%);
			--_box-shadow: 0 0 0px 1px hsl(225deg 100% 55%);
			box-shadow: var(--_box-shadow-dark, var(--_box-shadow));
			--_border-color-dark: hsl(225deg 100% 60%);
			border: 1px solid var(--_border-color-dark, hsl(225deg 100% 55%));
		}
	}
</style>

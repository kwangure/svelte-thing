<script lang="ts">
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';

	import type { HTMLAttributes } from 'svelte/elements';
	import { mdiCheck, mdiContentCopy } from '@mdi/js';
	import { Icon, Token } from '../../components/index.js';
	import {
		createCopier,
		type LineInterval,
	} from '../../creators/copy.svelte.js';
	import { skipEffect } from '@svelte-thing/component-utils/reactivity';

	interface Props extends HTMLAttributes<HTMLElement> {
		lines: { color: string; segment: string }[][];
		copyRanges?: LineInterval[] | undefined;
		copyText?: string | undefined;
	}

	const { lines, copyRanges, copyText, ...restProps }: Props = $props();
	const copier = createCopier({ text: copyText });
	const lineSet = $derived.by(() => {
		const resultSet = new Set<number>();
		for (const [start, end] of copyRanges ?? []) {
			for (let i = start; i <= end; i++) {
				resultSet.add(i);
			}
		}
		return resultSet;
	});
	skipEffect(
		() => copyText,
		(text) => {
			copier.text = text;
		},
	);
</script>

<code {...restProps}>
	{#if typeof copyText === 'string'}
		<div class="button">
			<Icon.Button
				label="Copy"
				path={copier.isCopied ? mdiCheck : mdiContentCopy}
				{...copier.props}
			/>
		</div>
	{/if}
	{#each lines as tokens, i}
		<div
			class="line"
			class:to-copy={lineSet.has(i + 1)}
			class:first={!lineSet.has(i - 2)}
			class:last={!lineSet.has(i + 2)}
		>
			{#each tokens as token}<Token {token} />{/each}
		</div>
	{/each}
</code>

<style>
	code {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-900);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-100)
		);
		--_border-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		border-color: var(--_border-color-dark, var(--st-color-neutral-300));
		border-width: 1px;
		border-radius: var(--st-size-1);
		display: grid;
		font-size: var(--st-size-3_5);
		grid-template-columns: 1fr;
		line-height: var(--st-size-6);
		margin-block-end: var(--st-size-2);
		margin-block-start: var(--st-size-4);
		overflow: auto;
		padding-block: var(--st-size-4);
		padding-inline-start: var(--st-size-3);
		padding-inline-end: var(--st-size-14);
		position: relative;
		white-space: pre-wrap;
	}
	.button {
		inset-block-start: var(--st-size-4);
		inset-inline-end: var(--st-size-3);
		position: absolute;
	}
	code:has(.button:hover) .to-copy {
		--_background-color-dark: var(--st-color-preference-dark)
			rgba(255, 255, 255, 0.1);
		background-color: var(--_background-color-dark, rgba(0, 0, 0, 0.1));
		transition: background-color 0.25s ease-in-out;
	}
	.first {
		border-top-left-radius: var(--st-size-1);
		border-top-right-radius: var(--st-size-1);
	}
	.last {
		border-bottom-left-radius: var(--st-size-1);
		border-bottom-right-radius: var(--st-size-1);
	}
	.line {
		padding-left: var(--st-size-2);
		min-height: var(--st-size-6);
	}
	.actions {
		align-items: center;
		display: flex;
		padding-inline: var(--st-size-1);
	}
</style>

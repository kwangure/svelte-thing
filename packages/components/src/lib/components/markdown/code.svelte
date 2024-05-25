<script lang="ts">
	import { Icon, Token } from '@svelte-thing/components';
	import type { Code } from 'mdast';
	import { createCopier, type LineInterval } from '../../creators/copy.js';
	import { mdiCheck, mdiContentCopy } from '@mdi/js';

	export let node: Code;

	const copier = createCopier({
		text: node.data?.copy?.text,
	});
	const { elements, inputs, outputs } = copier;
	const { isCopied } = outputs;

	$: attributes = node.data?.attributes ?? {};
	$: lines = node.data?.highlightedLines ?? [];
	$: lineSet = rangeToSet(node.data?.copy?.ranges ?? []);
	$: inputs.textToCopy.set(node.data?.copy?.text);

	function rangeToSet(ranges: LineInterval[]) {
		const resultSet = new Set<number>();
		for (const [start, end] of ranges) {
			for (let i = start; i <= end; i++) {
				resultSet.add(i);
			}
		}
		return resultSet;
	}
</script>

<code {...attributes}>
	<div class="button">
		<Icon.Button
			label="Copy"
			path={$isCopied ? mdiCheck : mdiContentCopy}
			action={elements.button}
		/>
	</div>
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
		height: var(--st-size-6);
		white-space: pre;
	}
	.actions {
		align-items: center;
		display: flex;
		padding-inline: var(--st-size-1);
	}
</style>

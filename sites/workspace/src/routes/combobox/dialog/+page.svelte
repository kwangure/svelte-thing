<script lang="ts">
	import * as Dialog from '$lib/dialog';
	import * as Combobox from '@svelte-thing/skinless-components/combobox';
	import {
		highlightFlattenColumns,
		highlightSearchResult,
	} from '@content-thing/memdb';
	import { mdiClose, mdiEyeOutline, mdiMagnify } from '@mdi/js';
	import { Icon } from '@svelte-thing/components';
	import { searchBookSumarries } from './documents';
	import Tokens from './tokens.svelte';

	let isOpen = $state(false);

	interface BookSummarySearchResult {
		id: string;
		title: string;
		tokens: {
			title: [string, number][];
			content: [string, number][];
		};
	}

	function filter(combobox: Combobox.FilterArg<BookSummarySearchResult>) {
		const { inputValue } = combobox;
		const results = searchBookSumarries(inputValue);
		const highlightedResults = [];
		for (const result of results) {
			const { title } = highlightSearchResult(result, ['title']);
			highlightedResults.push({
				id: result.document.id,
				title: result.document.title,
				tokens: {
					title,
					content: highlightFlattenColumns(result, ['content'], {
						matchLength: 20,
					}),
				},
			});
		}
		return highlightedResults;
	}
</script>

<Icon.Button
	label="Open Dialog"
	path={mdiEyeOutline}
	onclick={() => (isOpen = true)}
>
	Open Dialog
</Icon.Button>
<div class="wrapper">
	<Dialog.Root open={isOpen} onclose={() => (isOpen = false)}>
		<Combobox.Root
			label="Search Documents"
			{filter}
			optionToString={(option) => option.title}
		>
			{#snippet children(combobox)}
				<div class="input">
					<div class="search">
						<Icon.Simple path={mdiMagnify} />
					</div>
					<Combobox.Input
						placeholder="Search for Programming Book..."
					/>
					<div class="close">
						<Icon.Button
							label="Close"
							onclick={() => (isOpen = false)}
							path={mdiClose}
						/>
					</div>
				</div>
				{#if combobox.inputValue.trim()}
					<div class="results block-section">
						{#each combobox.filteredOptions as result}
							<Combobox.Item item={result}>
								<a href="#${result.id}">
									<div class="title">
										<Tokens tokens={result.tokens.title} />
									</div>
									<div class="content">
										<Tokens
											tokens={result.tokens.content}
										/>
									</div>
								</a>
							</Combobox.Item>
						{:else}
							<div class="no-results">
								<Icon.Simple
									path={mdiMagnify}
									--st-icon-height="var(--st-size-8)"
									--st-icon-width="var(--st-size-8)"
								/>
								No results found for "{combobox.inputValue.trim()}".
							</div>
						{/each}
					</div>
				{/if}
			{/snippet}
		</Combobox.Root>
	</Dialog.Root>
</div>

<style>
	.wrapper :global([data-st-dialog-root]) {
		inline-size: 90vw;
		margin-block-start: 16vh;
		max-inline-size: 35rem /* 560px */;
		max-block-size: min(70vh, 35rem /* 560px */);
	}
	.wrapper :global([data-st-combobox-root]) {
		height: 100%;
		min-height: 0;
	}
	.input {
		align-items: center;
		display: grid;
		grid-template-columns: max-content 1fr max-content;
		flex-shrink: 0;
		height: var(--st-size-12);
	}
	.search,
	.close {
		align-items: center;
		justify-content: center;
		display: flex;
		width: var(--st-size-12);
		height: 100%;
	}
	.input :global(input) {
		border: none;
		border: 0px;
		inset: 0px;
		height: 100%;
		line-height: var(--st-size-12);
		padding-inline: var(--st-size-1);
		outline: none;
	}
	.input :global(input:focus-visible) {
		outline: initial;
	}
	.results {
		--_border-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		border-color: var(--_border-color-dark, var(--st-color-neutral-400));
		border-top-width: 1px;
		display: flex;
		flex-direction: column;
		gap: var(--st-size-2);
		overflow-y: scroll;
		padding: var(--st-size-2);
		scroll-padding-block: var(--st-size-4);
	}
	.no-results {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-block: var(--st-size-4);
		opacity: 0.75;
	}
</style>

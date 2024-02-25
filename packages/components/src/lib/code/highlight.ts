import { highlightTree, tagHighlighter, tags } from '@lezer/highlight';
import type { LRParser } from '@lezer/lr';

const colors = tagHighlighter([
	{ tag: tags.atom, class: 'tok-atom' },
	{ tag: tags.bool, class: 'tok-boolean' },
	{ tag: tags.className, class: 'tok-class' },
	{ tag: tags.comment, class: 'tok-comment' },
	{ tag: tags.controlKeyword, class: 'tok-control-keyword' },
	{ tag: tags.definitionKeyword, class: 'tok-definition-keyword' },
	{
		tag: tags.function(tags.definition(tags.variableName)),
		class: 'tok-function-definition-name',
	},
	{
		tag: tags.function(tags.propertyName),
		class: 'tok-function-property-name',
	},
	{
		tag: tags.function(tags.variableName),
		class: 'tok-function-variable-name',
	},
	{ tag: tags.keyword, class: 'tok-keyword' },
	{ tag: tags.modifier, class: 'tok-modifier' },
	{ tag: tags.moduleKeyword, class: 'tok-module-keyword' },
	{ tag: tags.null, class: 'tok-null' },
	{ tag: tags.number, class: 'tok-number' },
	{ tag: tags.operatorKeyword, class: 'tok-operator-keyword' },
	{ tag: tags.propertyName, class: 'tok-property-name' },
	{ tag: tags.self, class: 'tok-self' },
	{ tag: tags.special(tags.string), class: 'tok-special-string' },
	{ tag: tags.string, class: 'tok-string' },
	{ tag: tags.typeName, class: 'tok-type-name' },
	{ tag: tags.variableName, class: 'tok-variable-name' },

	{ tag: tags.link, class: 'tok-link' },
	{ tag: tags.heading, class: 'tok-heading' },
	{ tag: tags.emphasis, class: 'tok-emphasis' },
	{ tag: tags.strong, class: 'tok-strong' },

	{ tag: tags.url, class: 'tok-url' },
	{ tag: tags.labelName, class: 'tok-label-name' },
	{ tag: tags.inserted, class: 'tok-inserted' },
	{ tag: tags.deleted, class: 'tok-deleted' },
	{ tag: tags.literal, class: 'tok-literal' },
	{ tag: tags.namespace, class: 'tok-namespace' },
	{ tag: tags.macroName, class: 'tok-macro-name' },
	{ tag: tags.operator, class: 'tok-operator' },
	{ tag: tags.meta, class: 'tok-meta' },
	{ tag: tags.invalid, class: 'tok-invalid' },
	{ tag: tags.punctuation, class: 'tok-punctuation' },
]);

export interface HighlightOptions {
	from?: number;
	to?: number;
}

export interface HighlightResult {
	color: string;
	segment: string;
}

export interface Highlighter {
	(code: string, options?: HighlightOptions): HighlightResult[];
}

export function highlight(
	parser: LRParser,
	code: string,
	options: HighlightOptions = {},
) {
	const parsed = parser.parse(code);
	const { from = 0, to = parsed.length } = options;
	let lastEnd = from;
	const highlighted = [];
	highlightTree(
		parsed,
		colors,
		(from, to, color) => {
			highlighted.push({ color: '', segment: code.slice(lastEnd, from) });
			highlighted.push({ color, segment: code.slice(from, to) });
			lastEnd = to;
		},
		from,
		to,
	);

	highlighted.push({ color: '', segment: code.slice(lastEnd, to) });

	return highlighted.filter(({ segment }) => segment);
}

export function highlightLines(code: string, highlighLanguage: Highlighter) {
	const sourceLines = code.split('\n');
	if (!highlighLanguage)
		return sourceLines.map((line) => {
			return [{ color: '', segment: line }];
		});

	let pos = 0;
	return sourceLines.map((line) => {
		const highlighted = highlighLanguage(code, {
			from: pos,
			to: pos + line.length + 1, // add 1 to account for the removed \n
		});
		pos += line.length + 1;
		return highlighted;
	});
}

const highlighters = import.meta.glob('./highlighter/*.js') as Record<
	string,
	() => Promise<Record<string, Highlighter>>
>;

const SUPPORTED_LANGUAGES = {
	bash: 'bash',
	cpp: 'cpp',
	css: 'css',
	html: 'html',
	javascript: 'javascript',
	js: 'javascript',
	jsx: 'javascript',
	typescript: 'typescript',
	ts: 'typescript',
	tsx: 'typescript',
	json: 'json',
	python: 'python',
	rust: 'rust',
	svelte: 'svelte',
} as const;

export type HighlightLanguage = keyof typeof SUPPORTED_LANGUAGES;

export function isSupportedLanguage(
	language: any,
): language is HighlightLanguage {
	if (typeof language !== 'string') return false;
	return Object.hasOwn(SUPPORTED_LANGUAGES, language);
}

export async function getHighlighter(language: HighlightLanguage) {
	const name = SUPPORTED_LANGUAGES[language];
	const path = `./highlighter/${name}.js`;
	const module = await highlighters[path]?.();
	return module?.[name];
}

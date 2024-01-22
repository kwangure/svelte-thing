<script>
	import { codeToThemedTokens } from 'shikiji';
	import { typescript } from '../lib/code/index.js';
	import { createDarkModeButton } from '../lib/creators/index.js';

	let code = [
		"import { log } from 'node:console';",
		'interface IUser {',
		'    name: string;',
		'    age: string;',
		'    isLoggedIn = false;',
		'}',
		"type Generation = 'X' | 'Z';",
		'class User implements IUser extends Object {',
		'    name: string;',
		'    age: string;',
		'    generation: Generation;',
		'    constructor(',
		'        name: string,',
		'        age: number,',
		'        generation?: Generation,',
		'    ) {',
		'        this.name = name;',
		'        this.age = age;',
		'        this.generation = generation;',
		'    }',
		'    get isAdult() {',
		'        return this.age >= 18;',
		'    }',
		'}',
		'const lastName = "Smithy"; // not Smith!',
		'let user = new User(`Alice ${lastName}`, 25);',
		'log(user instanceof User);',
		'user = null;',
	].join('\n');

	const { state } = createDarkModeButton();
	const { mode } = state;

	$: shikijiTokens = codeToThemedTokens(code, {
		lang: 'javascript',
		theme: $mode === 'dark' ? 'dark-plus' : 'light-plus',
	});
	const lezerTokens = typescript(code);
</script>

<div
	class="col-start-[content-start] col-end-[content-end] grid grid-cols-2 text-sm"
>
	<div class="font-mono">
		{#await shikijiTokens}
			{code}
		{:then tokenListList}
			{#each tokenListList as tokenList}
				<div>
					{#each tokenList as { color, content }}
						<span style="white-space: pre; color: {color}">{content}</span>
					{/each}
				</div>
			{/each}
		{/await}
	</div>
	<div class="whitespace-pre font-mono">
		{#each lezerTokens as { segment, color }}
			<span class={color}>{segment}</span>
		{/each}
	</div>
</div>

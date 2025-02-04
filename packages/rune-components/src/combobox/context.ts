import { getContext, setContext } from 'svelte';

const ROOT_CONTEXT_KEY = Symbol('root');

export function setRootContext<T>(root: T) {
	setContext(ROOT_CONTEXT_KEY, root);
	return root;
}

export function getRootContext<T>() {
	const root = getContext(ROOT_CONTEXT_KEY);
	if (!root) {
		throw new Error(
			'Root component context not found. Wrap child in a root component.',
		);
	}
	return root as T;
}

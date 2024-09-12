import type { StateNode, StateNodeConfig } from './types.js';

export function node(config?: StateNodeConfig) {
	return {
		children: new Set(),
		on: new Map(Object.entries(config?.on ?? {})),
	} satisfies StateNode;
}

export function appendChild(parent: StateNode, child: StateNode) {
	parent.children.add(child);
}

export function removeChild(parent: StateNode, child: StateNode) {
	parent.children.delete(child);
}

export function clearChildren(node: StateNode) {
	for (const child of node.children) {
		clearChildren(child);
	}
	node.children.clear();
}

export function emitEvent(node: StateNode, type: string, value: unknown) {
	node.on.get(type)?.(value);

	for (const child of node.children) {
		emitEvent(child, type, value);
	}
}

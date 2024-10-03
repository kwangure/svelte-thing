export interface StateNodeConfig {
	on: Record<string, StateEventListener>;
}

export interface StateEventListener {
	(event: unknown): unknown;
}

export class StateNode {
	#children = new Set<StateNode>();
	#on: Map<string, StateEventListener>;
	#parent: StateNode | null = null;

	constructor(config: StateNodeConfig) {
		this.#on = new Map(Object.entries(config.on));
	}

	appendChild(child: StateNode) {
		this.#children.add(child);
		child.#parent = this;
	}

	clearChildren() {
		for (const child of this.#children) {
			child.#parent = null;
		}
		this.#children.clear();
	}

	#emitEvent(type: string, value: unknown) {
		this.#on.get(type)?.(value);
		for (const child of this.#children) {
			child.#emitEvent(type, value);
		}
	}

	emitEvent(type: string, value: unknown) {
		/* eslint-disable-next-line @typescript-eslint/no-this-alias */
		let root: StateNode = this;
		while (root.#parent) {
			root = root.#parent;
		}

		root.#emitEvent(type, value);
	}

	removeChild(child: StateNode) {
		if (this.#children.delete(child)) {
			child.#parent = null;
		}
	}
}

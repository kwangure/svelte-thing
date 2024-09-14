export interface StateNode {
	children: Set<StateNode>;
	on: Map<string, StateEventListener>;
}

export interface StateNodeConfig {
	on?: Record<string, StateEventListener>;
}

export interface StateEventListener {
	(event: unknown): unknown;
}

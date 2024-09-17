import { chain } from './chain.js';
import type { Action } from 'svelte/action';

export type ActionArg = Action | null | undefined;

export function mergeActions(...actions: ActionArg[]) {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	return (node: HTMLElement, params?: any) => {
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		const updates: ((arg: any) => void)[] = [];
		const destroys: (() => void)[] = [];

		for (const action of actions) {
			const r = action?.(node, params);
			if (typeof r?.update === 'function') {
				updates.push(r.update);
			}
			if (typeof r?.destroy === 'function') {
				destroys.push(r.destroy);
			}
		}

		return {
			update: chain(...updates),
			destroy: chain(...destroys),
		};
	};
}

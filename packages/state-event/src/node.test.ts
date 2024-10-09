import { describe, it, expect, vi } from 'vitest';
import { StateNode } from './node.js';

describe('StateNode', () => {
	describe('appendChild and removeChild', () => {
		it('should add and remove child nodes correctly', () => {
			const parentListener = vi.fn();
			const child1Listener = vi.fn();
			const child2Listener = vi.fn();

			const parent = new StateNode({ on: { test: parentListener } });
			const child1 = new StateNode({ on: { test: child1Listener } });
			const child2 = new StateNode({ on: { test: child2Listener } });

			parent.appendChild(child1);
			parent.appendChild(child2);

			parent.emitEvent('test', 'value');
			expect(parentListener).toHaveBeenCalledTimes(1);
			expect(child1Listener).toHaveBeenCalledTimes(1);
			expect(child2Listener).toHaveBeenCalledTimes(1);

			parent.removeChild(child1);
			parent.emitEvent('test', 'value');
			expect(parentListener).toHaveBeenCalledTimes(2);
			expect(child1Listener).toHaveBeenCalledTimes(1); // Not called again
			expect(child2Listener).toHaveBeenCalledTimes(2);
		});
	});

	describe('clearChildren', () => {
		it('should remove all child nodes', () => {
			const parentListener = vi.fn();
			const child1Listener = vi.fn();
			const child2Listener = vi.fn();

			const parent = new StateNode({ on: { test: parentListener } });
			const child1 = new StateNode({ on: { test: child1Listener } });
			const child2 = new StateNode({ on: { test: child2Listener } });

			parent.appendChild(child1);
			parent.appendChild(child2);

			parent.emitEvent('test', 'value');
			expect(parentListener).toHaveBeenCalledTimes(1);
			expect(child1Listener).toHaveBeenCalledTimes(1);
			expect(child2Listener).toHaveBeenCalledTimes(1);

			parent.clearChildren();

			parent.emitEvent('test', 'value');
			expect(parentListener).toHaveBeenCalledTimes(2);
			expect(child1Listener).toHaveBeenCalledTimes(1); // Not called again
			expect(child2Listener).toHaveBeenCalledTimes(1); // Not called again
		});
	});

	describe('emitEvent', () => {
		it('should call the event listener on the root node', () => {
			const mockListener = vi.fn();
			const node = new StateNode({
				on: {
					test: mockListener,
				},
			});
			node.emitEvent('test', 'value');
			expect(mockListener).toHaveBeenCalledWith('value');
		});

		it('should propagate the event to child nodes', () => {
			const parentListener = vi.fn();
			const childListener = vi.fn();
			const parent = new StateNode({
				on: {
					test: parentListener,
				},
			});
			const child = new StateNode({
				on: {
					test: childListener,
				},
			});
			parent.appendChild(child);
			parent.emitEvent('test', 'value');
			expect(parentListener).toHaveBeenCalledWith('value');
			expect(childListener).toHaveBeenCalledWith('value');
		});

		it('should propagate the event up to the root node', () => {
			const rootListener = vi.fn();
			const root = new StateNode({
				on: {
					test: rootListener,
				},
			});
			const child = new StateNode({ on: {} });
			const grandchild = new StateNode({ on: {} });
			root.appendChild(child);
			child.appendChild(grandchild);
			grandchild.emitEvent('test', 'value');
			expect(rootListener).toHaveBeenCalledWith('value');
		});

		it('should propagate events from root to leaves in order', () => {
			const callOrder: string[] = [];
			const rootListener = vi.fn(() => callOrder.push('root'));
			const child1Listener = vi.fn(() => callOrder.push('child1'));
			const child2Listener = vi.fn(() => callOrder.push('child2'));
			const grandchild1Listener = vi.fn(() =>
				callOrder.push('grandchild1'),
			);
			const grandchild2Listener = vi.fn(() =>
				callOrder.push('grandchild2'),
			);

			const root = new StateNode({ on: { test: rootListener } });
			const child1 = new StateNode({ on: { test: child1Listener } });
			const child2 = new StateNode({ on: { test: child2Listener } });
			const grandchild1 = new StateNode({
				on: { test: grandchild1Listener },
			});
			const grandchild2 = new StateNode({
				on: { test: grandchild2Listener },
			});

			root.appendChild(child1);
			root.appendChild(child2);
			child1.appendChild(grandchild1);
			child2.appendChild(grandchild2);

			child1.emitEvent('test', 'value');

			expect(rootListener).toHaveBeenCalledWith('value');
			expect(child1Listener).toHaveBeenCalledWith('value');
			expect(child2Listener).toHaveBeenCalledWith('value');
			expect(grandchild1Listener).toHaveBeenCalledWith('value');
			expect(grandchild2Listener).toHaveBeenCalledWith('value');

			expect(callOrder).toEqual([
				'root',
				'child1',
				'grandchild1',
				'child2',
				'grandchild2',
			]);
		});
	});
});

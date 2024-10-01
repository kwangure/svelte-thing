import { invariant } from '@svelte-thing/component-utils';
import {
	appendChild,
	clearChildren,
	emitEvent,
	node,
	removeChild,
	type StateNode,
} from '@svelte-thing/state-event';

export interface CreateDialogConfig {
	hideOnInteractOutside?: boolean;
	isOpen: boolean | null | undefined;
	isModal?: boolean;
}

export type Dialog = ReturnType<typeof createDialogRoot>;

const createDialogEvent = (...type: (string | number)[]) =>
	`dialog.${type.join('.')}`;

export const dialogEvent = {
	close: createDialogEvent('close'),
	open: createDialogEvent('open'),
	set: {
		hideOnInteractOutside: createDialogEvent('set', 'hideOnInteractOutside'),
		isModal: createDialogEvent('set', 'isModal'),
		isOpen: createDialogEvent('set', 'isOpen'),
	},
};

export function createDialogRoot(config?: CreateDialogConfig) {
	let element = $state<HTMLDialogElement>();
	let hideOnInteractOutside = $state(config?.hideOnInteractOutside ?? true);
	let isModal = $state(config?.isModal ?? true);
	let isOpen = $state(config?.isOpen ?? false);
	let state: StateNode | undefined;

	function _appendChild(child: StateNode) {
		// TODO: Add DEV warning `state === undefined`
		if (!state) return;
		appendChild(state, child);
	}

	function _emitEvent(type: string, value?: unknown) {
		// TODO: Add DEV warning `state === undefined`
		if (!state) return;
		emitEvent(state, type, value);
	}

	function _removeChild(child: StateNode) {
		// TODO: Add DEV warning `state === undefined`
		if (!state) return;
		removeChild(state, child);
	}

	function setup() {
		if (state) return;
		state = node({
			on: {
				[dialogEvent.close]() {
					_emitEvent(dialogEvent.set.isOpen, false);
					element?.close();
				},
				[dialogEvent.open]() {
					_emitEvent(dialogEvent.set.isOpen, true);
					if (isModal) {
						element?.showModal();
					} else {
						element?.show();
					}
				},
				[dialogEvent.set.hideOnInteractOutside](value: unknown) {
					invariant(
						typeof value === 'boolean',
						`hideOnInteractOutside value must be a boolean. Received ${JSON.stringify(
							value,
						)} instead.`,
					);
					hideOnInteractOutside = value;
				},
				[dialogEvent.set.isModal](value: unknown) {
					invariant(
						typeof value === 'boolean',
						`isModal value must be a boolean. Received ${JSON.stringify(
							value,
						)} instead.`,
					);
					isModal = value;
				},
				[dialogEvent.set.isOpen](value: unknown) {
					invariant(
						typeof value === 'boolean',
						`isOpen value must be a boolean. Received ${JSON.stringify(
							value,
						)} instead.`,
					);
					isOpen = value;
				},
			},
		});
	}

	setup();

	function destroy() {
		if (!state) return;

		clearChildren(state);
		state = undefined;
	}

	return {
		action(node: HTMLDialogElement) {
			element = node;
			setup();
			return {
				destroy() {
					element = undefined;
					destroy();
				},
			};
		},
		appendChild: _appendChild,
		emitEvent: _emitEvent,
		removeChild: _removeChild,
		get isModal() {
			return isModal;
		},
		get isOpen() {
			return isOpen;
		},
		setHideOnInteractOutside(v: boolean | undefined) {
			_emitEvent(dialogEvent.set.hideOnInteractOutside, v ?? true);
		},
		setIsModal(v: boolean | undefined) {
			_emitEvent(dialogEvent.set.isModal, v ?? true);
		},
		setIsOpen(v: boolean | null | undefined) {
			if (v === true) {
				_emitEvent(dialogEvent.open);
			} else {
				_emitEvent(dialogEvent.close);
			}
		},
		properties: {
			get ['aria-hidden']() {
				return !isOpen || undefined;
			},
			get inert() {
				return !isOpen || undefined;
			},
			get open() {
				return isOpen || undefined;
			},
			onclose() {
				_emitEvent(dialogEvent.set.isOpen, false);
			},
			onclick(event: Event) {
				if (
					hideOnInteractOutside &&
					element &&
					!isClickInside(event, element)
				) {
					_emitEvent(dialogEvent.close);
				}
			},
		},
	};
}

function isClickInside(event: Event | MouseEvent, dialog: HTMLDialogElement) {
	if (!('clientY' in event)) return false;
	const rect = dialog.getBoundingClientRect();
	if (rect.width === 0 || rect.height === 0) return false;
	return (
		rect.top <= event.clientY &&
		event.clientY <= rect.bottom &&
		rect.left <= event.clientX &&
		event.clientX <= rect.right
	);
}

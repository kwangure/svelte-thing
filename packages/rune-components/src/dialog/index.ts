export { default as Close } from './close/close.svelte';
export { default as ModalPopup } from './modal-popup/modal-popup.svelte';
export { default as NonModalPopup } from './non-modal-popup/non-modal-popup.svelte';
export { default as Root } from './root/root.svelte';
export { default as Trigger } from './trigger/trigger.svelte';

export { getRootContext, setRootContext } from './context.js';

export {
	createRoot,
	type TRoot,
	type CreateRootConfig,
} from './root/root.svelte.js';

export {
	createClose,
	type TClose,
	type CreateCloseConfig,
} from './close/close.svelte.js';

export {
	createModalPopup,
	type TModalPopup,
	type CreateModalPopupConfig,
} from './modal-popup/modal-popup.svelte.js';

export {
	createNonModalPopup,
	type TNonModalPopup,
	type CreateNonModalPopupConfig,
} from './non-modal-popup/non-modal-popup.svelte.js';

export {
	createTrigger,
	type TTrigger,
	type CreateTriggerConfig,
} from './trigger/trigger.svelte.js';

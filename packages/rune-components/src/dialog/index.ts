export { default as Close } from './close/Close.svelte';
export { default as ModalPopup } from './modal-popup/ModalPopup.svelte';
export { default as NonModalPopup } from './non-modal-popup/NonModalPopup.svelte';
export { default as Root } from './root/Root.svelte';
export { default as Trigger } from './trigger/Trigger.svelte';

export { getRootContext, setRootContext } from './context.js';

export {
	createRoot,
	type TRoot,
	type CreateRootConfig,
} from './root/createRoot.svelte.js';

export {
	createClose,
	type TClose,
	type CreateCloseConfig,
} from './close/createClose.svelte.js';

export {
	createModalPopup,
	type TModalPopup,
	type CreateModalPopupConfig,
} from './modal-popup/createModalPopup.svelte.js';

export {
	createNonModalPopup,
	type TNonModalPopup,
	type CreateNonModalPopupConfig,
} from './non-modal-popup/createNonModalPopup.svelte.js';

export {
	createTrigger,
	type TTrigger,
	type CreateTriggerConfig,
} from './trigger/createTrigger.svelte.js';

export function cancelEvent(event: Event) {
	event.stopPropagation();
	event.preventDefault();
}

export function isClickInside(
	event: Event | MouseEvent,
	dialog: HTMLDialogElement,
) {
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

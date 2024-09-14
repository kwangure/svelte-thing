export function cancelEvent(event: Event) {
	event.stopPropagation();
	event.preventDefault();
}

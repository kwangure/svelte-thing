export const Mod = {
	Alt: 1 << 0,
	Control: 1 << 1,
	Shift: 1 << 2,
} as const;

export const Keys = {
	ArrowDown: 1 << 3,
	Down: 1 << 3, // Legacy alias for 'ArrowDown'
	ArrowUp: 1 << 4,
	Up: 1 << 4, // Legacy alias for 'ArrowUp'
	Backspace: 1 << 5,
	Delete: 1 << 6,
	End: 1 << 7,
	Enter: 1 << 8,
	Escape: 1 << 9,
	Esc: 1 << 9, // Legacy alias for 'Escape'
	Home: 1 << 10,
	Tab: 1 << 11,
} as const;

export function eventToKeys(event: KeyboardEvent): number {
	return (
		(event.altKey ? Mod.Alt : 0) |
		(event.ctrlKey ? Mod.Control : 0) |
		(event.shiftKey ? Mod.Shift : 0) |
		(Keys[event.key as keyof typeof Keys] || 0)
	);
}

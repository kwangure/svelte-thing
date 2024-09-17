export const Mod = {
	Alt: 0,
	Control: 1,
	Shift: 2,
} as const;

export const Keys = {
	ArrowDown: 3,
	Down: 3, // Legacy alias for 'ArrowDown'
	ArrowUp: 4,
	Up: 4, // Legacy alias for 'ArrowUp'
	Backspace: 5,
	Delete: 6,
	End: 7,
	Enter: 8,
	Escape: 9,
	Esc: 9, // Legacy alias for 'Escape'
	Home: 10,
	Tab: 11,
	// ... more keys can be added here up to 127
} as const;

export function eventToKeys(event: KeyboardEvent): string {
	const result = new Uint32Array(4); // 4 * 32 = 128 bits

	result[0] |=
		((event.altKey as unknown as number | 0) << Mod.Alt) |
		((event.ctrlKey as unknown as number | 0) << Mod.Control) |
		((event.shiftKey as unknown as number | 0) << Mod.Shift);

	const keyCode = Keys[event.key as keyof typeof Keys] | 0;
	const index = keyCode >>> 5; // Divide by 32 to get the array index
	const bitPosition = keyCode & 31; // Modulo 32 to get the bit position
	result[index] |= 1 << bitPosition;

	let str = '';
	for (let i = 0; i < result.length; i++) {
		if (result[i] !== 0 || str !== '') {
			/* !(result[i] == 0 && str == '') */ str += result[i]
				.toString(16)
				.padStart(8, '0');
		}
	}

	return str;
}

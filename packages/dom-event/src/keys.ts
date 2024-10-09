export const Keys = {
	Alt: 0,
	Control: 1,
	Shift: 2,
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

export type KeyCode = (typeof Keys)[keyof typeof Keys] & {};
export type KeyName = keyof typeof Keys;

export function keysFromEvent(event: KeyboardEvent) {
	const keys: KeyCode[] = [];
	if (event.altKey) keys.push(Keys.Alt);
	if (event.ctrlKey) keys.push(Keys.Control);
	if (event.shiftKey) keys.push(Keys.Shift);
	if (event.key in Keys) keys.push(Keys[event.key as KeyName]);
	return keys;
}

export function encodeKeys(keyCodes: KeyCode[]) {
	const bitset = new Uint32Array(4); // 4 * 32 = 128 bits
	for (const keyCode of keyCodes) {
		const index = keyCode >>> 5; // Divide by 32 to get the array index
		const bitPosition = keyCode & 31; // Modulo 32 to get the bit position
		// @ts-expect-error undefined won't happen if `keyCode` satisfies `KeyCode`
		bitset[index] |= 1 << bitPosition;
	}

	let str = '';
	for (let i = bitset.length - 1; i >= 0; i--) {
		if (bitset[i] !== 0 || str) {
			// @ts-expect-error undefined won't happen if `keyCode` satisfies `KeyCode`
			str += '.' + bitset[i].toString(16);
		}
	}
	return str;
}

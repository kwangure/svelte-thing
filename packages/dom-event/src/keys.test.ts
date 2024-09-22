import { describe, it, expect } from 'vitest';
import { Keys, keysFromEvent } from './keys';

describe('keysFromEvent', () => {
	it('should correctly encode a single modifier press', () => {
		const event = new KeyboardEvent('keydown', { ctrlKey: true });
		expect(keysFromEvent(event)).toEqual([Keys.Control]);
	});

	it('should correctly encode a single non-modifier press', () => {
		const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
		expect(keysFromEvent(event)).toEqual([Keys.ArrowUp]);
	});

	it('should correctly encode a key press with modifiers', () => {
		const event = new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			altKey: true,
			ctrlKey: true,
			shiftKey: true,
		});
		expect(keysFromEvent(event)).toEqual([
			Keys.Alt,
			Keys.Control,
			Keys.Shift,
			Keys.ArrowDown,
		]);
	});

	it('should handle legacy key aliases', () => {
		const downEvent = new KeyboardEvent('keydown', { key: 'Down' });
		const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
		expect(keysFromEvent(downEvent)).toEqual(keysFromEvent(arrowDownEvent));

		const escEvent = new KeyboardEvent('keydown', { key: 'Esc' });
		const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
		expect(keysFromEvent(escEvent)).toEqual(keysFromEvent(escapeEvent));
	});

	it('should return an empty string for unknown keys', () => {
		const event = new KeyboardEvent('keydown', { key: 'UnknownKey' });
		expect(keysFromEvent(event)).toEqual([]);
	});

	it.todo('should correctly encode keys with high key codes', () => {
		// Enable test when we go above a bitset with more than 32 positions
		const event = new KeyboardEvent('keydown', { key: 'Z' });
		expect(keysFromEvent(event)).toEqual([]);
	});
});

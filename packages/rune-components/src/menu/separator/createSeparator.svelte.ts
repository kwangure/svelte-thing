export type TSeparator = ReturnType<typeof createSeparator>;

export function createSeparator() {
	return {
		props: {
			role: 'separator',
		},
	};
}

export function objectKeys<T extends object>(obj: T) {
	return Object.keys(obj) as (keyof T)[];
}

export function objectValues<T extends object>(obj: T) {
	return Object.values(obj) as T[keyof T][];
}

export function objectEntries<T extends object>(obj: T) {
	// https://stackoverflow.com/questions/49401866/all-possible-keys-of-an-union-type
	return Object.entries(obj) as [T extends T ? keyof T : never, T[keyof T]][];
}

export function objectGroupBy<
	TItem extends Record<PropertyKey, unknown>,
	TKey extends {
		[K in keyof TItem]: TItem[K] extends PropertyKey ? K : never;
	}[keyof TItem],
>(array: readonly TItem[], key: TKey) {
	const result: Record<PropertyKey, TItem[]> = {};

	for (const item of array) {
		const groupKey = item[key] as PropertyKey;
		if (!result[groupKey]) {
			result[groupKey] = [];
		}
		result[groupKey].push(item);
	}

	return result as {
		[K in TItem[TKey] & PropertyKey]: Extract<TItem, Record<TKey, K>>[];
	};
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { chain } from './chain.js';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Props = Record<string, any>;

type PropsArg = Props | null | undefined;

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = { [P in keyof T]: T[P] } extends Record<number, infer V>
	? NullToObject<V>
	: never;
/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
type NullToObject<T> = T extends null | undefined ? {} : T;
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I,
) => void
	? I
	: never;

export function mergeProps<T extends PropsArg[]>(...args: T) {
	// Start with a base clone of the first argument. This is faster than
	// starting with an empty object and adding properties as we go.
	const result: Props = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		const props = args[i];
		for (const key in props) {
			const a = result[key];
			const b = props[key];

			// Chain events
			if (
				typeof a === 'function' &&
				typeof b === 'function' &&
				// This is a lot faster than a regex.
				key[0] === 'o' &&
				key[1] === 'n' &&
				!!key[2]
			) {
				result[key] = chain(a, b);
			} else if (
				(key === 'class' || key === 'id') &&
				typeof a === 'string' &&
				typeof b === 'string'
			) {
				// dedupe selectors to avoid changes in CSS specificity
				if (a.trim() === b.trim()) {
					result[key] = a;
				} else {
					result[key] = a + ' ' + b;
				}
			} else {
				result[key] = b !== undefined ? b : a;
			}
		}
	}

	return result as UnionToIntersection<TupleTypes<T>>;
}

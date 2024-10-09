/**
 * Transforms the optional fields of a given object type into required fields,
 * preserving their types as `T | undefined`. Required fields in the original
 * type remain unchanged.
 *
 * @example
 * // Input
 * type MyRecord = {
 *   field1?: string; // optional
 *   field2: number; // required
 * };
 *
 * // Output
 * type MyRecord = {
 *   field1: string | undefined; // made required with `T | undefined`
 *   field2: number; // unchanged (already required)
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NullablyRequired<T> = { [P in keyof T & keyof any]: T[P] };

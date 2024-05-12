/**
	Replaces bigint, Date, Set, and Map values with wrapping objects.
	@param this Object being stringified.
	@param key Property name.
	@param value Property value.
	@returns JSON string.
*/
export function replace(this: any, key: string, value: any): any {
	if (typeof value === 'bigint') {
		return { __json_bigint__: value.toString() };
	}
	if (this[ key ] instanceof Date && value) {
		return { __json_date__: value };
	}
	if (this[ key ] instanceof Set && value) {
		return { __json_set__: Array.from(value.keys() as Iterable<unknown>) };
	}
	if (this[ key ] instanceof Map && value) {
		return { __json_map__: Array.from(value.entries() as Iterable<unknown>) };
	}
	return value;
}

/**
	Revives bigint, Date, Set, and Map values from wrapping objects.
	@param key Property name.
	@param value Property value.
	@returns Parsed value.
*/
export function revive(key: string, value: any): any {
	if (value != null && typeof value === 'object') {
		if ('__json_bigint__' in value && typeof value.__json_bigint__ === 'string') {
			return BigInt(value.__json_bigint__ as string);
		}
		if ('__json_date__' in value && typeof value.__json_date__ === 'string') {
			return new Date(value.__json_date__ as string);
		}
		if ('__json_set__' in value && typeof value.__json_set__ === 'object') {
			return new Set(value.__json_set__ as Iterable<unknown>);
		}
		if ('__json_map__' in value && typeof value.__json_map__ === 'object') {
			return new Map(value.__json_map__ as Iterable<readonly [unknown, unknown]>);
		}
	}
	return value;
}

/**
	Returns JSON string with bigint, Date, Set, and Map values wrapped into objects.
	@param value Object to stringify.
	@param space Adds indentation, white space, and line break characters to the return-value.
	@returns JSON string.
*/
export function stringify<T = any>(value: T, space?: number | string): string {
	return JSON.stringify(value, replace, space);
}

/**
	Returns object with bigint, Date, Set, and Map values parsed from wrapper objects.
	@param value String to parse.
	@returns Parsed value.
*/
export function parse<T = any>(value: string): T {
	return JSON.parse(value, revive) as T;
}

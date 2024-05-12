# json-extension
Functions for extended JSON stringification and parsing that supports most commonly used types,
 such as bigint, Date, Set, and Map.
Replaces and revives extended types using objects with `__json_bigint__`, `__json_date__`, `__json_set__`,
 and `__json_map__` properties.

Target: ES2022 [browser+NodeJS][ESM+CJS].

### replace
JSON replacer for JSON.stringify function. Replaces extended type values with wrapper objects.

### revive
JSON reviver for JSON.parse function. Revives extended type values from wrapper objects.

### stringify
Returns JSON string with extended type values wrapped into objects.

### parse
Returns value with extended type values parsed from wrapper objects.

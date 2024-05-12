import { stringify, parse } from "../src/index.js";

describe('JSON Extension test to', ()=> {
	it('stringify and parse bigint', ()=> {
		const original = 1000000000000000000000000000000n;
		const computed = parse(stringify({ value: original })).value;
		expect(computed).toEqual(original);
	});
	it('stringify and parse Date', ()=> {
		const original = new Date();
		const computed = parse(stringify({ value: original })).value;
		expect(computed).toEqual(original);
	});
	it('stringify and parse Set', ()=> {
		const original = new Set([ 'abc', 'def', 'xyz' ]);
		const computed = parse(stringify({ value: original })).value;
		expect(computed.size).toEqual(original.size);
		expect(computed.has('abc')).toEqual(original.has('abc'));
	});
	it('stringify and parse Map', ()=> {
		const original = new Map([ [ 'abc', 100 ], [ 'def', 200 ], [ 'xyz', 900 ] ]);
		const computed = parse(stringify({ value: original })).value;
		expect(computed.size).toEqual(original.size);
		expect(computed.get('abc')).toEqual(original.get('abc'));
	});
});

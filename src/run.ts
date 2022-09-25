// reference https://github.com/vuejs/petite-vue/blob/main/src/eval.ts

const fn_cache: Record<string, Function> = Object.create(null);

export const run = (target: Object, expr: string, el?: Element) => {
	const fn = fn_cache[expr] || (fn_cache[expr] = createFunction(expr));
	try {
		return fn(target, el);
	} catch (e) {
		console.error(e);
	}
};

function createFunction(expr: string): Function {
	try {
		return new Function(`$data`, `$el`, `with($data){${expr}}`);
	} catch (e) {
		console.error(`${(e as Error).message} in expression: ${expr}`);
		return () => {};
	}
}

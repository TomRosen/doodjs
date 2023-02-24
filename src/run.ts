// reference https://github.com/vuejs/petite-vue/blob/main/src/eval.ts
import { refs } from "./init";

const fn_cache: Record<string, Function> = Object.create(null);

export const run = (target: Object, expr: string, el?: Element) => {
  const fn = fn_cache[expr] || (fn_cache[expr] = createFunction(expr));
  try {
    return fn(target, Object.fromEntries(refs), el);
  } catch (e) {
    console.error(e);
  }
};

function createFunction(expr: string): Function {
  try {
    return new Function(`$data`, `$refs`, `$el`, `with($data){${expr}}`);
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${expr}`);
    return () => {};
  }
}

export const set_from_list = (
  target: Object,
  name: string,
  iterator: string,
  index: number
): void => {
  const expr = `${name} = ${iterator}[$index]`;
  const fn = fn_cache[expr] || (fn_cache[expr] = createSetFunction(expr));
  try {
    return fn(target, index);
  } catch (e) {
    console.error(e);
  }
};

function createSetFunction(expr: string) {
  try {
    return new Function("$data", "$index", `with($data){${expr}}`);
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${expr}`);
    return () => {};
  }
}

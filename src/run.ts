// reference https://github.com/vuejs/petite-vue/blob/main/src/eval.ts
import { refs } from "./init";

const fn_cache: Record<string, Function> = Object.create(null);

export const run = (
  target: Object,
  expr: string,
  args: Array<any> = [],
  el?: Element
) => {
  const fn = fn_cache[expr] || (fn_cache[expr] = createFunction(expr));
  try {
    return fn(target, Object.fromEntries(refs), el, args);
  } catch (e) {
    console.error(e);
  }
};

function createFunction(expr: string): Function {
  try {
    return new Function(
      `$data`,
      `$refs`,
      `$el`,
      `$args`,
      `with($data){${expr}}`
    );
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${expr}`);
    return () => {};
  }
}

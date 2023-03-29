// reference https://github.com/vuejs/petite-vue/blob/main/src/eval.ts
import { refs } from "./init";
import { createNestedWith } from "./helper/createNestedWith";

const fn_cache: Record<string, Function> = Object.create(null);

export const run = (
  target: Array<Object>,
  expr: string,
  args: Array<any> = [],
  el?: Element
) => {
  const fn =
    fn_cache[expr] || (fn_cache[expr] = createFunction(expr, target?.length));
  try {
    return fn(target, Object.fromEntries(refs), el, args);
  } catch (e) {
    console.error(e);
  }
};

function createFunction(expr: string, contextCount: number): Function {
  if (contextCount > 0) {
    const { start, end } = createNestedWith(contextCount, "$proxies");
    expr = `${start} ${expr} ${end}`;
  } else {
    expr = `with($proxies){${expr}}`;
  }

  try {
    return new Function(
      `$proxies`,
      `$refs`,
      `$el`,
      `$args`,
      // `with($data){${expr}}`
      expr
    );
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${expr}`);
    return () => {};
  }
}

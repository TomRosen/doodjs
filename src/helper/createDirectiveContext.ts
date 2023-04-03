import { DirectiveContext } from "../typedef";
import { run } from "../run";
import { getAttribute } from "./getAttribute";

export const createDirectiveContext = (
  el: Element,
  attr: string,
  target: Array<Object>
): DirectiveContext => {
  let arg = attr.match(/:(\w+|\w+\.\w+|\w+\[\w+\])/)?.[1];
  let modifiers = attr.match(/\.([a-z]+)/g)?.map((mod) => mod.slice(1));
  let expr = getAttribute(el, attr);
  return {
    el,
    expr: expr,
    arg: arg || "",
    modifiers: modifiers || [],
    run: (expression?: string, args: Array<any> = []) =>
      run(target, expression || expr, args, el),
  };
};

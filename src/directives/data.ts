import { DirectiveContext } from "../typedef";
import { context_map } from "../init";
import { createProxy } from "../helper/createProxy";

export const data = ({ run, el, expr }: DirectiveContext) => {
  const data = run(`return ${expr}`);
  context_map.set(el, createProxy(data));
};

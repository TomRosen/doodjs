import { DirectiveContext } from "../typedef";
import { createEffect } from "../effect";
import { toStyleString, toClassString } from "../helper/parseObject";

export const bind = ({ el, run, expr, arg }: DirectiveContext) => {
  createEffect(() => {
    let value = run(`return ${expr}`);
    //improve this
    if (typeof value === "object") {
      if (arg === "style") {
        value = toStyleString(value);
      } else if (arg === "class") {
        value = toClassString(value);
      }
    }
    el.setAttribute(arg || "", value ?? "");
  });
};

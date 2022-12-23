import { DirectiveContext } from "../typedef";
import { createEffect } from "../effect";

export const text = ({ el, run, expr }: DirectiveContext) => {
  createEffect(() => {
    (el as HTMLElement).innerText = run(`return ${expr}`);
  });
};

import { DirectiveContext } from "../typedef";
import { refs } from "../init";

// @ts-ignore
export const ref = (ctx: DirectiveContext) => {
  try {
    refs.set(ctx.expr, ctx.el);
  } catch (e) {
    console.error(
      `${(e as Error).message} while creating reference for ${ctx.expr}`
    );
  }
};

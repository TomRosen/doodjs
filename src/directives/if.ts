import { createEffect } from "../effect";
import { DirectiveContext } from "../typedef";
import { getAttribute } from "../helper/getAttribute";

interface ConditionContext {
  el: Element;
  expr?: string;
}

// @ts-ignore
export const d_if = (ctx: DirectiveContext) => {
  const { el, expr } = ctx;
  if (expr.trim() === "") {
    console.error(`Expression in if directive is empty`);
    return;
  }
  const parent = el.parentElement;
  if (parent === null) return;
  const comment = document.createComment("d-if");
  parent.insertBefore(comment, el);

  const conditionContexts: ConditionContext[] = [{ el, expr: expr }];
  let elseEl: Element | null = null;
  while ((elseEl = el.nextElementSibling)) {
    if (elseEl.hasAttribute("d-else") || elseEl.hasAttribute("d-else-if")) {
      conditionContexts.push({
        el: elseEl,
        expr: getAttribute(elseEl, "d-else-if"),
      });
      parent.removeChild(elseEl);
    } else {
      break;
    }
  }

  let activeConditionContext: number = -1;

  const removeActiveCondition = () => {
    if (activeConditionContext === -1) return;
    parent.replaceChild(comment, conditionContexts[activeConditionContext].el);
    activeConditionContext = -1;
  };

  createEffect(() => {
    for (let i = 0; i < conditionContexts.length; i++) {
      const { el, expr: exp } = conditionContexts[i];
      if (!exp || ctx.run(`return ${exp}`)) {
        if (activeConditionContext !== i) {
          removeActiveCondition();
          parent.replaceChild(el, comment);
          activeConditionContext = i;
        }
        return;
      }
      removeActiveCondition();
    }
  });
};

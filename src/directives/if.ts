import { createEffect } from '../effect';
import { DirectiveContext } from '../typedef';

interface ConditionContext {
	el: Element;
	exp?: string;
}

// @ts-ignore
export const d_if = (ctx: DirectiveContext) => {
	const { el, expr } = ctx;
	if (!expr.trim()) {
		console.error(`Expression in if directive is empty`);
		return;
	}
	const parent = el.parentElement;
	if (parent === null) return;
	const comment = document.createComment('d-if');
	parent.insertBefore(comment, el);

	const conditionContexts: ConditionContext[] = [{ el, exp: expr }];
	let elseEl: Element | null = null;
	while ((elseEl = el.nextElementSibling)) {
		if (elseEl.hasAttribute('d-else') || elseEl.hasAttribute('d-else-if')) {
			conditionContexts.push({
				el: elseEl,
				exp: elseEl.getAttribute('d-else-if') || undefined,
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
			const { el, exp } = conditionContexts[i];
			if (!exp || ctx.run(`return ${exp}`)) {
				if (activeConditionContext !== i) {
					removeActiveCondition();
					parent.replaceChild(el, comment);
					activeConditionContext = i;
				}
				return;
			}
			removeActiveCondition();
			activeConditionContext = -1;
		}
	});
};

import { run } from '../run';

import { DirectiveContext } from '../typedef';

// @ts-ignore
export const html = (ctx: DirectiveContext, target: Object) => {
	const { node, value } = ctx;
	(<HTMLElement>node).innerHTML = run(target, `return ${value}`, node);
};

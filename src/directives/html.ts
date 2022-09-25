import { run } from '../run';

import { DirectiveData } from '../typedef';

// @ts-ignore
export const html = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	(<HTMLElement>node).innerHTML = run(target, `return ${value}`, node);
};

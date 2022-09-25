import { run } from '../run';

import { DirectiveData } from '../typedef';

// @ts-ignore
export const bind = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	(<HTMLInputElement>node).value = run(target, `return ${value}`, node);
};

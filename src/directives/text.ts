import { run } from '../run';
import { DirectiveData } from '../typedef';

// @ts-ignore
export const text = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	(<HTMLElement>node).innerText = run(target, `return ${value}`, node);
};

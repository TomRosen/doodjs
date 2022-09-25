import { run } from '../run';
import { DirectiveData } from '../typedef';

// @ts-ignore
export const show = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	if (run(target, `return ${value}`, node)) {
		(<HTMLElement>node).style.display = 'block';
	} else {
		(<HTMLElement>node).style.display = 'none';
	}
};

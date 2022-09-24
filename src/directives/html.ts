import { DirectiveData } from '../typedef';

// @ts-ignore
export const html = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	(<HTMLElement>node).innerHTML = eval(`with(target) { ${value} }`);
};

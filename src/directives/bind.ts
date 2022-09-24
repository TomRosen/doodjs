import { DirectiveData } from '../typedef';

// @ts-ignore
export const bind = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	(<HTMLInputElement>node).value = eval(`with(target) { ${value} }`);
};

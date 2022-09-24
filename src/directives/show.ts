import { DirectiveData } from '../typedef';

// @ts-ignore
export const show = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	if (eval(`with(target) { ${value} }`)) {
		(<HTMLElement>node).style.display = 'block';
	} else {
		(<HTMLElement>node).style.display = 'none';
	}
};

import { DirectiveData } from '../typedef';

// @ts-ignore
export const d_if = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	const result = eval(`with(target) { ${value} }`);
	if (result) {
		(<HTMLElement>node).style.display = 'block';
	} else {
		(<HTMLElement>node).style.display = 'none';
	}
};

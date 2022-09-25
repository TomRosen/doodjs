import { DirectiveData } from '../typedef';

// @ts-ignore
export const show = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	if (new Function('with(this){return ' + value + '}').call(target)) {
		(<HTMLElement>node).style.display = 'block';
	} else {
		(<HTMLElement>node).style.display = 'none';
	}
};

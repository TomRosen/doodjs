import { DirectiveData } from '../typedef';

// @ts-ignore
export const text = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	(<HTMLElement>node).innerText = new Function(
		'with(this){return ' + value + '}'
	).call(target);
};

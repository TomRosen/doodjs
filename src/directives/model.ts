import { DirectiveData } from '../typedef';

// @ts-ignore
export const model = (data: DirectiveData, target: Object) => {
	const { node, value } = data;
	(<HTMLInputElement>node).value = new Function(
		'with(this){return ' + value + '}'
	).call(target);
};
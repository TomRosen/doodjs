import { DirectiveData } from '../typedef';

// @ts-ignore
export const effect = (data: DirectiveData, target: Object) => {
	const { value } = data;
	eval(`with(target) { ${value} }`);
};

import { walkDOM } from './walk';

import { DirectiveData, DoodVariable, Directive } from './typedef';

// @ts-ignore
interface InitOptions {
	root: HTMLElement;
	onMount: (el: HTMLElement) => void;
	onUnmount: (el: HTMLElement) => void;
}

export let DoodVariables: DoodVariable[] = [];

export const init = (data: Object) => {
	let map: Map<DoodVariable, Map<Directive, [DirectiveData]>> = new Map();

	Object.entries(data).forEach(([key, value]) => {
		DoodVariables.push({ name: key, initial: value, value: value });
	});
	console.log(DoodVariables);

	const dood_data: Object = new Proxy(data, {
		set: (target, key, value) => {
			target[key as keyof Object] = value;
			return true;
		},
	});
	map = walkDOM(document.body, dood_data);
};

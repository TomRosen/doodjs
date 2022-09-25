import { walkDOM } from './walk';

import { DoodVariable, DoodData } from './typedef';

// @ts-ignore
interface InitOptions {
	root?: Element;
	onMount?: (el: HTMLElement) => void;
	onUnmount?: (el: HTMLElement) => void;
}

export let variable_map: Map<string, DoodVariable> = new Map();

export const init = (data: Object) => {
	Object.entries(data).forEach(([key, value]) => {
		variable_map.set(key, {
			name: key,
			initial: value,
			value: value,
			observers: [],
		});
	});

	const dood_data: DoodData = new Proxy(data, {
		set: (target, key, value) => {
			target[key as keyof Object] = value;
			if (variable_map.has(key as string)) {
				variable_map.get(key as string)!.value = value;
				variable_map.get(key as string)!.observers.forEach((dir) => {
					dir.fn(dir.data, target);
				});
			}
			return true;
		},
	});
	walkDOM(document.body, dood_data);

	return dood_data;
};

import { walkDOM } from './walk';
import { trigger, track } from './effect';

import { DoodVariable, DoodData, effect } from './typedef';

// @ts-ignore
interface InitOptions {
	root?: Element;
	onMount?: (el: HTMLElement) => void;
	onUnmount?: (el: HTMLElement) => void;
}

export let variable_map: Map<string, DoodVariable> = new Map();

export let effect_map: WeakMap<
	Object,
	Map<string, Set<effect>>
> = new WeakMap();

export const init = (data: Object) => {
	Object.entries(data).forEach(([key, value]) => {
		variable_map.set(key, {
			name: key,
			initial: value,
			value: value,
		});
	});

	effect_map.set(data, new Map());

	const dood_data: DoodData = new Proxy(data, {
		get: (target, key) => {
			track(target, key as string);
			return target[key as keyof Object];
		},
		set: (target, key, value) => {
			target[key as keyof Object] = value;
			trigger(target, key as string);
			return true;
		},
	});
	walkDOM(document.body, dood_data);

	return dood_data;
};

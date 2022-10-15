import { effect_map } from './init';
import { DirectiveContext, effect } from './typedef';

let currentEffect: effect | null = null;

const getSubscribers = (target: Object, key: string) => {
	if (!effect_map.has(target)) {
		effect_map.set(target, new Map());
	}
	if (!effect_map.get(target)?.has(key)) {
		effect_map.get(target)?.set(key, new Set());
	}
	return effect_map.get(target)?.get(key);
};

export const track = (target: Object, key: string) => {
	if (currentEffect) {
		const subscribers = getSubscribers(target, key);
		subscribers?.add(currentEffect);
	}
};

export const trigger = (target: Object, key: string) => {
	effect_map
		.get(target)
		?.get(key)
		?.forEach((effect) => effect());
};

export const createEffect = (ctx: DirectiveContext, target: Object) => {
	const effect = () => {
		currentEffect = effect;
		ctx.run(); //runs directive function
		currentEffect = null;
	};
	effect();
};

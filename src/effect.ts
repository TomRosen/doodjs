import { EffectMap } from './init';
import { effect } from './typedef';

let currentEffect: effect | null = null;

const getSubscribers = (target: Object, key: string) => {
	if (!EffectMap.has(target)) {
		EffectMap.set(target, new Map());
	}
	if (!EffectMap.get(target)?.has(key)) {
		EffectMap.get(target)?.set(key, new Set());
	}
	return EffectMap.get(target)?.get(key);
};

export const track = (target: Object, key: string) => {
	if (currentEffect !== null) {
		const subscribers = getSubscribers(target, key);
		subscribers?.add(currentEffect);
	}
};

export const trigger = (target: Object, key: string) => {
	getSubscribers(target, key)?.forEach((effect) => effect());
};

export const createEffect = (fn: () => any) => {
	const effect = () => {
		currentEffect = effect;
		fn(); //runs directive effect
		currentEffect = null;
	};
	effect();
};

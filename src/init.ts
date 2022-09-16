import { walkDOM } from './walk';

export const init = (data: Object) => {
	const dood_data = new Proxy(data, {
		set: (target, key, value) => {
			target[key as keyof Object] = value;
			return true;
		},
	});
};

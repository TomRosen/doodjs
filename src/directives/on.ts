import { DirectiveContext } from '../typedef';
import { eventModifiers } from '../helper/eventModifiers';

export const on = ({ el, expr, arg, run, modifiers }: DirectiveContext) => {
	let raw = run(`return ($event => {${expr}})`);
	let func = (event: Event) => {
		for (const key of modifiers!) {
			console.log(key);
			const mod = eventModifiers[key];
			console.log(mod);
			if (mod && mod(event)) {
				return;
			}
		}

		return raw(event);
	};

	el.addEventListener(arg as keyof ElementEventMap, func);
};

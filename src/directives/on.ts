import { DirectiveContext } from '../typedef';
import { eventModifiers } from '../helper/eventModifiers';

export const on = ({ el, expr, arg, run, modifiers }: DirectiveContext) => {
	let raw = run(`return ($event => {${expr}})`);
	let func = (event: Event) => {
		for (const key of modifiers!) {
			const mod = eventModifiers[key];
			if (mod && mod(event)) {
				return;
			}
		}

		return raw(event);
	};

	el.addEventListener(arg as keyof ElementEventMap, func); //todo: add options to eventListener
};

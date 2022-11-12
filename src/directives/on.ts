import { DirectiveContext } from '../typedef';
import { eventModifiers } from '../helper/eventModifiers';

export const on = ({ el, expr, arg, run, modiefiers }: DirectiveContext) => {
	el.addEventListener(arg as keyof ElementEventMap, (e: Event) => {
		modiefiers?.forEach((mod) => {
			if (eventModifiers[mod]) {
				eventModifiers[mod](e);
			}
		});
		run(expr, e);
	});
};

import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const bind = ({ el, run, expr, arg }: DirectiveContext) => {
	if (!arg) {
		console.error('bind directive does not support argument');
		return;
	}
	createEffect(() => {
		const value = run(`return ${expr}`);
		if (value) {
			el.setAttribute(arg || '', value);
		} else {
			el.removeAttribute(arg || '');
		}
	});
};

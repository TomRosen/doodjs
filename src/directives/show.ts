import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const show = ({ el, run, expr }: DirectiveContext) => {
	createEffect(() => {
		if (run(`return ${expr}`)) {
			(<HTMLElement>el).style.display = 'block';
		} else {
			(<HTMLElement>el).style.display = 'none';
		}
	});
};

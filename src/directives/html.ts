import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const html = ({ el, run, expr }: DirectiveContext) => {
	createEffect(() => {
		(<HTMLElement>el).innerHTML = run(`return ${expr}`);
	});
};

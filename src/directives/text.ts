import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const text = ({ el, run, expr }: DirectiveContext) => {
	createEffect(() => {
		(<HTMLElement>el).innerText = run(`return ${expr}`);
	});
};

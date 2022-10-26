import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const bind = ({ el, run, expr }: DirectiveContext) => {
	createEffect(() => {
		(<HTMLInputElement>el).value = run(`return ${expr}`);
	});
};

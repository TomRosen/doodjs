import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const text = ({ el, run, expr, arg, modiefiers }: DirectiveContext) => {
	console.log(arg, modiefiers);
	createEffect(() => {
		(<HTMLElement>el).innerText = run(`return ${expr}`);
	});
};

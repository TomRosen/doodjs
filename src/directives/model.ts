import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const model = ({ el, run, expr }: DirectiveContext) => {
	//add Eventlistener here
	createEffect(() => {
		(<HTMLInputElement>el).value = run(`return ${expr}`);
	});
};

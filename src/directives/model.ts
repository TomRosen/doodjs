import { DirectiveContext, DoodData } from '../typedef';
import { createEffect } from '../effect';

export const model = (
	{ el, run, expr }: DirectiveContext,
	target: DoodData
) => {
	//add Eventlistener workaround
	if (expr in target) {
		el.addEventListener('input', (e: Event) => {
			const value = (e.target as HTMLInputElement).value;
			target[expr] = value;
		});
	} else {
		console.error(`Property ${expr}, in model, does not exist in target`);
	}

	createEffect(() => {
		(<HTMLInputElement>el).value = run(`return ${expr}`);
	});
};

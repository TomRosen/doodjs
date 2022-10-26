import { DirectiveContext } from '../typedef';

// @ts-ignore
export const d_if = (ctx: DirectiveContext) => {
	const { el, expr } = ctx;
	const result = eval(`with(target) { ${expr} }`);
	if (result) {
		(<HTMLElement>el).style.display = 'block';
	} else {
		(<HTMLElement>el).style.display = 'none';
	}
};

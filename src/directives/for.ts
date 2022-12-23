import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;

export const d_for = ({ expr }: DirectiveContext) => {
	const match = expr.match(forAliasRE);
	if (match === null) {
		throw new Error(`Invalid for expression: ${expr}`);
	}
	//get child elements of el

	//walk new elements with new variables
	//create a child context
	createEffect(() => {
		//create new child elements
	});
};

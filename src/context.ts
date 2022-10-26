import { DirectiveContext } from './typedef';
import { run } from './run';

export const createContext = (
	el: Element,
	expr: string,
	target: Object
): DirectiveContext => {
	const ctx: DirectiveContext = {
		el,
		expr,
		run: (expression: string = expr) => {
			return run(target, expression, el);
		}, //run needs the target
	};
	return ctx;
};

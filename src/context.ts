import { DirectiveContext } from './typedef';
import { run } from './run';

export const createContext = (el: Element, expr: string): DirectiveContext => {
	const ctx: DirectiveContext = {
		el,
		expr,
		run: (e: string = expr) => run(new Object(), e, el), //run needs the target
	};
	return ctx;
};

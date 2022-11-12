import { DirectiveContext } from './typedef';
import { run } from './run';
import { getAttribute } from './helper/getAttribute';

export const createContext = (
	el: Element,
	attr: string,
	target: Object
): DirectiveContext => {
	let arg = attr.match(/:(\w+|\w+\.\w+|\w+\[\w+\])/)?.[1];
	console.log(arg);
	let modiefiers = attr.match(/\.([a-z]+)/g)?.map((mod) => mod.slice(1));
	let expr = getAttribute(el, attr);
	return {
		el,
		expr: expr,
		arg: arg || '',
		modiefiers: modiefiers || [],
		run: (expression?: string, event?: Event) =>
			run(target, expression || expr, el, event),
	};
};

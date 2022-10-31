import { DirectiveContext } from './typedef';
import { run } from './run';

export const createContext = (
	el: Element,
	attr: string,
	target: Object
): DirectiveContext => {
	let arg = attr.match(/:(.*?)(?=\.)|:(.*)$/)?.[1];
	let modiefiers = attr.match(/\.([a-z]+)/g)?.map((mod) => mod.slice(1));
	return {
		el,
		expr: el.getAttribute(attr)!,
		arg: arg || '',
		modiefiers: modiefiers || [],
		run: (expression?: string) =>
			run(target, expression || el.getAttribute(attr)!, el),
	};
};

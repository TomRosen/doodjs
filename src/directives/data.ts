import { DirectiveContext } from '../typedef';
import { ContextMap } from '../init';
import { createProxy } from '../helper/createProxy';

export const data = ({ run, el, expr }: DirectiveContext) => {
	const data = run(`return ${expr}`);
	ContextMap.set(el, createProxy(data));
};

import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const on = (_: DirectiveContext) => {
	createEffect(() => {});
};

import { DirectiveContext } from '../typedef';
import { createEffect } from '../effect';

export const effect = ({ run }: DirectiveContext) => {
	createEffect(() => {
		run();
	});
};

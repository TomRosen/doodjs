import { directives } from './directives';
import { createContext } from './context';

import { Directive, DoodData, DirectiveContext } from './typedef';

let directive_func: Array<Function> = [];

export const walkDOM = (
	main: Element,
	dood_data: DoodData //proxy
) => {
	var loop = function (main: Element | null) {
		do {
			if (main === null) return;
			if (main.nodeType != 1) continue;
			if (main.hasAttribute('d-ignore')) continue;

			main.getAttributeNames().forEach((attr) => {
				if (attr.startsWith('d-')) {
					let ctx: DirectiveContext = createContext(main!, attr, dood_data);
					let directive: Directive | undefined = directives.find((directive) =>
						attr.startsWith(directive.name)
					);
					if (directive) {
						if (directive.name == 'd-ref') {
							directive_func.unshift(() => directive!.fn(ctx, dood_data));
						} else {
							directive_func.push(() => directive!.fn(ctx, dood_data));
						}
					}
				}
			});
			if (main!.hasChildNodes() && main != null) loop(main.firstElementChild);
		} while (main != null && (main = main.nextElementSibling));
	};
	loop(main);
	directive_func.forEach((func) => func());
};

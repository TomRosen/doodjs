import { directives } from './directives';
import { parse_attribute } from './parse';

import { DirectiveData, DoodVariable, Directive } from './typedef';

export const walkDOM = (
	main: Element,
	//data: Object,
	dood_data: Object //proxy
) => {
	var arr: Map<DoodVariable, Map<Directive, [DirectiveData]>> = new Map();
	let data: Object = { ...dood_data }; //convert proxy to object, maybe there is a better way, must be tested
	var loop = function (main: Element | null) {
		do {
			if (main === null) return;
			if (main.nodeType != 1) continue;
			if (main.hasAttribute('ignore')) continue;

			directives.forEach((dir: Directive) => {
				let att: string = dir.name;
				if (main!.hasAttribute(att)) {
					parse_attribute(main!, main!.getAttribute(att), data).forEach(
						(value, key) => {
							if (!arr.has(key)) arr.set(key, new Map());
							//if (att == 'model') addModelEvent(main, key, dood_data);
							let map = arr.get(key);
							if (!map!.has(dir)) map!.set(dir, [value]);
							else map!.get(dir)!.push(value);
						}
					);
				}
			});
			if (main.hasChildNodes() && main != null) loop(main.firstElementChild);
		} while (main != null && (main = main.nextElementSibling));
	};
	loop(main);
	return arr;
};

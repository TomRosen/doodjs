import { directives } from './directives';
import { parse_attribute } from './parse';
import { variable_map } from './init';
import { addModelEventListener } from './eventlistener';

import { Directive, DoodData } from './typedef';

export const walkDOM = (
	main: Element,
	//data: Object,
	dood_data: DoodData //proxy
) => {
	let data: Object = { ...dood_data }; //convert proxy to object, maybe there is a better way, must be tested
	var loop = function (main: Element | null) {
		do {
			if (main === null) return;
			if (main.nodeType != 1) continue;
			if (main.hasAttribute('ignore')) continue;

			directives.forEach((dir: Directive) => {
				const { name, fn } = dir;
				if (main!.hasAttribute(name)) {
					parse_attribute(main!, main!.getAttribute(name), data).forEach(
						(value, key) => {
							variable_map.get(key)!.observers.push({
								name: name,
								fn: fn,
								data: value,
							});
							if (name === 'model') {
								addModelEventListener(<HTMLElement>main!, key, dood_data);
							}
							/* if (!arr.has(key)) arr.set(key, new Map());
							//if (att == 'model') addModelEvent(main, key, dood_data);
							let map = arr.get(key);
							if (!map!.has(dir)) map!.set(dir, [value]);
							else map!.get(dir)!.push(value); */
						}
					);
				}
			});
			if (main.hasChildNodes() && main != null) loop(main.firstElementChild);
		} while (main != null && (main = main.nextElementSibling));
	};
	loop(main);
};

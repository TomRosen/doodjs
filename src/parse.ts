import { DoodVariables } from './init';

import { DirectiveData, DoodVariable } from './typedef';

export const parse_attribute = (
	el: Element,
	attribute: string | null,
	data: Object
) => {
	attribute = attribute || '';
	let map: Map<DoodVariable, DirectiveData> = new Map();
	let used_attributes: string[] = [];
	// @ts-ignore
	let test_data = new Proxy(data, {
		get: (target, prop: string) => {
			if (!used_attributes.includes(prop) && prop in target)
				used_attributes.push(prop);
			return target[prop as keyof Object];
		},
	});

	eval(`with(test_data){${attribute}}`);
	for (let att of used_attributes) {
		let dvar: DoodVariable | undefined = DoodVariables.find(
			(dvar) => dvar.name == att
		);
		if (!dvar) continue;
		map.set(dvar, {
			node: el,
			value: attribute,
		});
	}
	return map;
};

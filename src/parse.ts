import { DirectiveData } from './typedef';

export const parse_attribute = (
	el: Element,
	attribute: string | null,
	data: Object
) => {
	attribute = attribute || '';
	let map: Map<string, DirectiveData> = new Map();
	let used_attributes: string[] = [];
	// @ts-ignore
	let test_data = new Proxy(data, {
		get: (target, prop: string) => {
			if (!used_attributes.includes(prop) && prop in target)
				used_attributes.push(prop);
			return target[prop as keyof Object];
		},
	});

	new Function('with(this){' + attribute + '}').call(test_data);
	for (let att of used_attributes) {
		map.set(att, {
			node: el,
			value: attribute,
		});
	}
	return map;
};

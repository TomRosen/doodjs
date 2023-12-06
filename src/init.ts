import { walkDOM } from './walk';
import { createProxy } from './helper/createProxy';
import { Context, effect, InitOptions, Plugin } from './typedef';
import { addDirective } from './directives';

// @ts-ignore

export let EffectMap: WeakMap<Object, Map<string, Set<effect>>> = new WeakMap(); // maps attributes to their effects

export let ContextMap: WeakMap<Element, Context> = new WeakMap(); // maps Contexts to their root element

export let refs: Map<string, Element> = new Map(); // elemets accessable by $ref

export let DoodOptions: InitOptions;

export const init = (data: Object, options: InitOptions) => {
	let dood_data: Context = new Object();
	EffectMap.set(data, new Map());

	DoodOptions = options || {};
	DoodOptions.root = options?.root ?? document.body;

	dood_data = createProxy(data);
	ContextMap.set(DoodOptions.root, dood_data);

	walkDOM(DoodOptions.root);

	return dood_data;
};

export const plugin = (plugin: Plugin) => {
	addDirective(plugin.directives);

	plugin.init();
};

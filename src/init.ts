import { walkDOM } from "./walk";
import { createProxy } from "./helper/createProxy";
import { DoodData, effect, InitOptions, Plugin } from "./typedef";
import { addDirective } from "./directives";

// @ts-ignore

export let effect_map: WeakMap<
  Object,
  Map<string, Set<effect>>
> = new WeakMap();

export let context_map: WeakMap<Element, Object> = new WeakMap();

export let refs: Map<string, Element> = new Map();

export let dood_data: DoodData = new Object();

export let dood_options: InitOptions;

export const init = (data: Object, options: InitOptions) => {
  effect_map.set(data, new Map());
  dood_options = options || {};
  dood_options.root = options?.root ?? document.body;

  dood_data = createProxy(data);
  context_map.set(dood_options.root, dood_data);

  walkDOM(dood_options.root, dood_data);
  return dood_data;
};

export const plugin = (plugin: Plugin) => {
  addDirective(plugin.directives);
};

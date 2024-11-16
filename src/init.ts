import { walkDOM } from "./walk";
import { createProxy } from "./helper/createProxy";
// @ts-ignore
import { Context, effect, InitOptions, Plugin } from "./typedef";
import { addDirective } from "./directives";

export let refs: Map<string, Element> = new Map(); // elemets accessable by $ref

export let ContextMap: WeakMap<Element, Context> = new WeakMap(); // maps Contexts to their root element

export let EffectMap: WeakMap<
  Context,
  Map<string, Set<effect>>
> = new WeakMap();

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

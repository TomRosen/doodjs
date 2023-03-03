import { walkDOM } from "./walk";
import { trigger, track } from "./effect";

import { DoodData, effect, Plugin } from "./typedef";
import { addDirective } from "./directives";

// @ts-ignore
interface InitOptions {
  root?: Element;
  onMount?: (el: HTMLElement) => void;
  onUnmount?: (el: HTMLElement) => void;
}

export let effect_map: WeakMap<
  Object,
  Map<string, Set<effect>>
> = new WeakMap();

export let refs: Map<string, Element> = new Map();

export let dood_data: DoodData = new Object();

export const init = (data: Object) => {
  effect_map.set(data, new Map());
  let handler = {
    get: (target: Object, key: string): any => {
      if (key === "isProxy") return true;
      if (
        target[key as keyof Object] instanceof Object &&
        // @ts-ignore "should be changed"
        !target[key as keyof Object]?.isProxy
      ) {
        // @ts-ignore
        target[key as keyof typeof target] = new Proxy(
          target[key as keyof Object],
          handler
        );
      }

      track(target, key as string);
      return target[key as keyof Object];
    },
    set: (target: Object, key: string, value: any): any => {
      target[key as keyof Object] = value;
      trigger(target, key as string);
      return true;
    },
  };

  dood_data = new Proxy(data, handler);
  walkDOM(document.querySelector("#main") ?? document.body, dood_data);
  return dood_data;
};

export const plugin = (plugin: Plugin) => {
  addDirective(plugin.directives);
};

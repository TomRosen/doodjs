import { trigger, track } from "../effect";
import { Context } from "../typedef";

const handler = {
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
export function createProxy(target: Object): Context {
  return new Proxy(target, handler);
}

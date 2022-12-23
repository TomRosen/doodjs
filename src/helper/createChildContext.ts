import { DoodData } from '../typedef'

export const createChildContext = (context: DoodData, child: Object) => {
  for(let key in child) {
    Object.defineProperty(context, key, {
      get: () => child[key as keyof Object],
      set: (value: any) => {
          return child[key as keyof Object] = value;
      }
    });
  }
}

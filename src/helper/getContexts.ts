import { ContextMap, DoodOptions } from "../init";
import { Context } from "../typedef";

// optimize (function walks more than necessary)
export function getContexts(
  el: Element,
  parentContexts: Array<Context> | undefined
): Array<Context> {
  const contexts: Set<Context> = new Set<Context>(parentContexts || []);
  let parent: Element | null = el;

  while (parent) {
    const context: Object | undefined = ContextMap.get(parent);
    if (context) {
      if (parentContexts?.indexOf(context) === -1) break; //check if correct
      contexts.add(context);
    }
    if (parent === DoodOptions.root) break;
    parent = parent.parentElement;
  }

  return Array.from(contexts);
}

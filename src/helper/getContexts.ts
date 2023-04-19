import { context_map, dood_options } from "../init";
import { Context } from "../typedef";

// optimize (function walks more than necessary)
export function getContexts(
  el: Element,
  parentContexts: Array<Context> | undefined
): Array<Context> {
  const contexts: Set<Context> = new Set<Context>(parentContexts || []);
  let parent: Element | null = el;

  while (parent) {
    const context: Object | undefined = context_map.get(parent);
    if (context) {
      if (parentContexts?.indexOf(context) === -1) break;
      contexts.add(context);
    }
    if (parent === dood_options.root) break;
    parent = parent.parentElement;
  }

  return Array.from(contexts);
}

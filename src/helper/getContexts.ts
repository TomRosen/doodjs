import { context_map, dood_options } from "../init";
import { Context } from "../typedef";

// optimize (function walks more than necessary)
export function getContexts(el: Element): Context[] {
  const contexts: Object[] = [];
  let parent: Element | null = el;

  while (parent) {
    const context: Object | undefined = context_map.get(parent);
    if (context) {
      contexts.push(context);
    }
    if (parent === dood_options.root) break;
    parent = parent.parentElement;
  }

  return contexts;
}

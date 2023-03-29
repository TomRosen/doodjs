import { context_map, dood_options } from "../init";

// optimize (function walks more than necessary)
export function getContexts(el: Element): Object[] {
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

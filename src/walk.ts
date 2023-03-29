import { directives } from "./directives";
import { createContext } from "./context";

import { Directive, DoodData, DirectiveContext } from "./typedef";
import { getContexts } from "./helper/getContexts";

let isFor = false;

export const walkDOM = (
  main: Element,
  dood_data: DoodData //proxy
) => {
  const directive_func: Array<Function> = new Array<Function>();
  const loop = function (main: Element | null) {
    do {
      if (main === null || main === undefined) return;
      if (main.nodeType != 1) continue;
      if (main.hasAttribute("d-ignore")) continue;

      for (const attr of main.getAttributeNames()) {
        if (attr.indexOf("d-") !== 0 || attr == "d-else-if" || attr == "d-else")
          continue;
        const ctx: DirectiveContext = createContext(
          main!,
          attr,
          getContexts(main!)
        );
        const directive: Directive | undefined = directives.find((directive) =>
          attr.startsWith(directive.name)
        );
        if (directive !== undefined) {
          if (directive.name == "d-ref") {
            directive_func.unshift(() => directive!.fn(ctx, dood_data));
          } else if (directive.name == "d-data") {
            // to improve
            directive!.fn(ctx, dood_data);
          } else {
            directive_func.push(() => directive!.fn(ctx, dood_data));
          }
        }
        if (directive?.name == "d-for") {
          isFor = true;
        } else {
          isFor = false;
        }
      }

      if (main!.hasChildNodes() && main != null && isFor == false)
        loop(main.firstElementChild);
    } while (main != null && (main = main.nextElementSibling));
  };

  loop(main);

  for (const func of directive_func) {
    func();
  }
};

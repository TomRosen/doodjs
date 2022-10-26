import { directives } from "./directives";
import { createContext } from "./context";

import { Directive, DoodData, DirectiveContext } from "./typedef";

export const walkDOM = (
  main: Element,
  dood_data: DoodData //proxy
) => {
  var loop = function (main: Element | null) {
    do {
      if (main === null) return;
      if (main.nodeType != 1) continue;
      if (main.hasAttribute("ignore")) continue;

      directives.forEach((dir: Directive) => {
        const { name } = dir;
        if (main!.hasAttribute(name)) {
          let ctx: DirectiveContext = createContext(
            main!,
            main!.getAttribute(name)!,
            dood_data
          );
          dir.fn(ctx);
        }
      });
      if (main.hasChildNodes() && main != null) loop(main.firstElementChild);
    } while (main != null && (main = main.nextElementSibling));
  };
  loop(main);
};

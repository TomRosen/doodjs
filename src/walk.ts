import { directives } from "./directives";
import { createDirectiveContext } from "./helper/createDirectiveContext";

import { Directive, DirectiveContext, WalkOptions } from "./typedef";
import { getContexts } from "./helper/getContexts";

const inlineIgnore: Array<Element> = new Array<Element>();
let isFor = false;
let walkOptions: WalkOptions = {};

const getInline = (resolver: any) => {
  const regex = /{{.*}}/; // /{{.*}}/g
  const inlineDirectiveFuncs = new Array<Function>();
  const walker = document.createTreeWalker(
    resolver || document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        if (
          inlineIgnore.indexOf(node.parentElement) === -1 &&
          regex.test(node.textContent ?? "")
        ) {
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return NodeFilter.FILTER_SKIP;
        }
      },
    }
  );

  while (walker.nextNode()) {
    const currentElement = walker.currentNode.parentElement;
    const ctx: DirectiveContext = createDirectiveContext(
      currentElement as Element,
      "inline",
      getContexts(currentElement as Element, walkOptions?.parentContexts)
    );
    const directive: Directive | undefined = directives.find(
      (directive) => directive.name == "inline"
    );
    if (directive !== undefined) {
      inlineDirectiveFuncs.push(() => directive.fn(ctx));
    }
  }
  inlineDirectiveFuncs.forEach((func) => func());
};

export const walkDOM = (main: Element, options: WalkOptions = {}) => {
  isFor = false;
  walkOptions = options;
  const directive_func: Array<Function> = new Array<Function>();
  const loop = function (main: Element | null) {
    do {
      if (main === null || main === undefined) return;
      if (main.nodeType != 1) continue;
      if (main.hasAttribute("d-ignore")) {
        inlineIgnore.push(main);
        continue;
      }

      for (const attr of main.getAttributeNames()) {
        if (attr.indexOf("d-") !== 0 || attr == "d-else-if" || attr == "d-else")
          continue;
        const ctx: DirectiveContext = createDirectiveContext(
          main!,
          attr,
          getContexts(main!, walkOptions?.parentContexts)
        );

        const directive: Directive | undefined = directives.find((directive) =>
          attr.startsWith(directive.name)
        );
        if (directive !== undefined) {
          if (directive.name == "d-ref") {
            directive_func.unshift(() => directive!.fn(ctx));
          } else if (directive.name == "d-data") {
            // to improve
            directive!.fn(ctx);
          } else {
            directive_func.push(() => directive!.fn(ctx));
          }
        }
        if (directive?.name == "d-for") {
          //put all the children of the d-for element in the ignore list
          const children = main.querySelectorAll("*");
          for (let i = 0; i < children.length; i++) {
            inlineIgnore.push(children[i]);
          }
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

  if (options?.checkForInline !== false) getInline(main);
  for (const func of directive_func) {
    func();
  }
};

import { DirectiveContext, Context } from "../typedef";
import { createEffect } from "../effect";
import { walkDOM } from "../walk";
import { EffectMap } from "../init";

const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const aliasKeyRE = /(?:\()?(.*?)(?:\))?,([^),]*)/;

export const d_for = (context: DirectiveContext) => {
  const { el, expr, run, contexts } = context;

  // const children = Array.from(el.childNodes);
  const children = Array.from(el.children);
  if (!children.length) {
    throw new Error(`d-for element must have child nodes`);
  }

  const parsed = expr.match(forAliasRE);
  if (parsed === null) {
    throw new Error(`Invalid for expression: ${expr}`);
  }
  const [, alias, iteratorExpr] = parsed;

  let iterator: any[];
  let key: string;

  createEffect(() => {
    console.time("d-for");
    // Get the current iterator and key (if any)
    [iterator, key] = getIteratorAndKey(run(`return ${iteratorExpr}`));

    let fragment = document.createDocumentFragment();

    el.textContent = "";

    const length = iterator.length;
    for (var i = 0; i < length; i++) {
      for (const node of children) {
        const newEl = node.cloneNode(true);

        fragment.appendChild(newEl);
      }

      walkDOM(fragment.children[i], {
        parentContexts: [...contexts, { [alias]: iterator[i] }],
        checkForInline: false,
      });
    }

    el.appendChild(fragment);
    console.timeEnd("d-for");
  });
};

function getIteratorAndKey(obj: any) {
  let iterator: any[], key: any;
  if (Array.isArray(obj)) {
    iterator = obj;
    key = undefined;
  } else if (obj instanceof Map) {
    iterator = Array.from(obj.values());
    key = Array.from(obj.keys());
  } else if (obj instanceof Set) {
    iterator = Array.from(obj.values());
    key = undefined;
  } else {
    iterator = Object.values(obj);
    key = Object.keys(obj);
  }
  return [iterator, key];
}

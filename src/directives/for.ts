import { DirectiveContext } from "../typedef";
import { createEffect } from "../effect";
import { walkDOM } from "../walk";

const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const aliasKeyRE = /(?:\()?(.*?)(?:\))?,([^),]*)/;

export const d_for = (context: DirectiveContext) => {
  const { el, expr, run, contexts } = context;

  const childNodes = Array.from(el.childNodes);
  if (!childNodes.length) {
    throw new Error(`d-for element must have child nodes`);
  }

  const parsed = expr.match(forAliasRE);
  if (parsed === null) {
    throw new Error(`Invalid for expression: ${expr}`);
  }
  const [, alias, iteratorExpr] = parsed;

  const aliasParsed = alias.match(aliasKeyRE);
  if (aliasParsed !== null) {
    var [, valueAlias, keyAlias] = aliasParsed;
    run(`keys = ${iteratorExpr}.keys()`);
  }
  let iterator: any[];
  let key: string;

  createEffect(() => {
    // Get the current iterator and key (if any)
    [iterator, key] = getIteratorAndKey(context.run(`return ${iteratorExpr}`));

    const fragment = document.createDocumentFragment();

    el.textContent = "";

    const length = iterator.length;
    for (var i = 0; i < length; i++) {
      // Set the context for the new element
      run(`${valueAlias || alias} = ${iteratorExpr}[$args[0]]`, [i]);
      if (keyAlias) {
        run(`${keyAlias} = keys.next().value`, [i]);
      }

      for (const node of childNodes) {
        const newEl = node.cloneNode(true);
        fragment.appendChild(newEl);
      }

      walkDOM(fragment.children[i], { parentContexts: contexts });
    }

    el.appendChild(fragment);
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

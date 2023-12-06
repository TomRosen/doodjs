import { DirectiveContext } from "../typedef";
import { createEffect } from "../effect";

export const model = ({ el, run, expr }: DirectiveContext) => {
  //add Eventlistener workaround
  if (run(`return ${expr}`) !== undefined) {
    el.addEventListener("input", (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      // target[expr] = value;
      run(`${expr} = '${value}'`); // to be optimized, because functions may not be cached
    });
  } else {
    console.error(`Property ${expr}, in model, does not exist in target`);
  }

  createEffect(() => {
    (<HTMLInputElement>el).value = run(`return ${expr}`);
  });
};

// !!!! TODO !!!!
// check why creatNestedProxy get called when value changes
//

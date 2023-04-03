import { DirectiveContext } from "../typedef";
import { createEffect } from "../effect";

export const inline = ({ el, run }: DirectiveContext) => {
  const regex = /{{(.+?)}}/g;
  const textChunks = el?.textContent?.split(regex) || [];
  createEffect(() => {
    let text = "";
    const length = textChunks.length;
    for (let i = 0; i < length; i++) {
      const chunk = textChunks[i];
      if (i % 2 === 0) {
        text += chunk;
      } else {
        text += run(`return ${chunk}`);
      }
    }
    el.textContent = text;
  });
};

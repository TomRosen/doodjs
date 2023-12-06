// import { Directive, DirectiveInitOrder } from "../typedef";

import { text } from "./text";
import { show } from "./show";
import { model } from "./model";
import { ref } from "./ref";
import { bind } from "./bind";
import { effect } from "./effect";
import { html } from "./html";
import { d_if } from "./if";
import { on } from "./on";
import { d_for } from "./for";
import { init } from "./init";
import { data } from "./data";
import { inline } from "./inline";

export const directives: Directive[] = [
  //check if a map might be faster than array using array.find
  {
    name: "d-model",
    fn: model,
    initOrder: "DEFAULT",
  },
  {
    name: "d-if",
    fn: d_if,
    initOrder: "DEFAULT",
  },
  {
    name: "d-ref",
    fn: ref,
    initOrder: "BEFORE",
  },
  {
    name: "d-show",
    fn: show,
    initOrder: "DEFAULT",
  },
  {
    name: "d-bind",
    fn: bind,
    initOrder: "DEFAULT",
  },
  {
    name: "d-effect",
    fn: effect,
    initOrder: "DEFAULT",
  },
  {
    name: "d-text",
    fn: text,
    initOrder: "DEFAULT",
  },
  {
    name: "d-html",
    fn: html,
    initOrder: "DEFAULT",
  },
  {
    name: "d-on",
    fn: on,
    initOrder: "DEFAULT",
  },
  {
    name: "d-for",
    fn: d_for,
    initOrder: "DEFAULT",
  },
  { name: "d-init", fn: init, initOrder: "DEFAULT" },
  { name: "d-data", fn: data, initOrder: "IMMEDIATE" },
  {
    name: "inline",
    fn: inline,
    initOrder: "DEFAULT" /* currently ignored */,
  },
];

export const directivesToIgnore: string[] = ["d-else-if", "d-else"];

export const addDirective = (directive: Directive[]) => {
  directives.push(...directive);
};

export const addDirectiveToIgnore = (directive: string[]) => {
  directivesToIgnore.push(...directive);
};

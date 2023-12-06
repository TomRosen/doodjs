// declare const enum DirectiveInitOrder {
//   DEFAULT,
//   BEFORE,
//   IMMEDIATE,
// }
// const enums seem to be broken, because when building the enums are not replaced and the code is not valid

declare type DirectiveInitOrder = "DEFAULT" | "BEFORE" | "IMMEDIATE";

declare interface Directive {
  name: string;
  fn: (ctx: DirectiveContext) => void;
  initOrder: DirectiveInitOrder;
}

declare interface Context {
  [key: string]: any;
}

declare interface DirectiveContext {
  el: Element;
  expr: string;
  arg?: string;
  modifiers?: string[];
  contexts: Array<Context>;
  run: (expression?: string, args?: Array<any>) => any;
}

declare interface Plugin {
  name: string;
  directives: Directive[];
}

declare interface WalkOptions {
  parentContexts?: Array<Context>; // contexts available to all directives that will be initialized
  explicitInline?: boolean; // if true, will only check for inline code if specified with directive
  checkForInline?: boolean; // if true, will check for inline code
}

declare interface InitOptions {
  root?: Element;
  onMount?: (el: HTMLElement) => void;
  onUnmount?: (el: HTMLElement) => void;
  explicitInline?: boolean;
}

declare type effect = () => void;

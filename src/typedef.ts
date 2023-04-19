export interface Directive {
  name: string;
  fn: (ctx: DirectiveContext) => void;
}

export interface Context {
  [key: string]: any;
}

export interface DirectiveContext {
  el: Element;
  expr: string;
  arg?: string;
  modifiers?: string[];
  contexts: Array<Context>;
  run: (expression?: string, args?: Array<any>) => any;
}

export interface Plugin {
  name: string;
  directives: Directive[];
}

export interface WalkOptions {
  parentContexts?: Array<Context>;
  explicitInline?: boolean;
  checkForInline?: boolean;
}

export interface InitOptions {
  root?: Element;
  onMount?: (el: HTMLElement) => void;
  onUnmount?: (el: HTMLElement) => void;
  explicitInline?: boolean;
}

export type effect = () => void;

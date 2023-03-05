export interface Directive {
  name: string;
  fn: (ctx: DirectiveContext, target: DoodData) => void;
}

export interface DoodData {
  [key: string]: any;
}

export interface DirectiveContext {
  el: Element;
  expr: string;
  arg?: string;
  modifiers?: string[];
  run: (expression?: string, args?: Array<any>) => any;
}

export interface Plugin {
  name: string;
  directives: Directive[];
}

export interface InitOptions {
  root?: Element;
  onMount?: (el: HTMLElement) => void;
  onUnmount?: (el: HTMLElement) => void;
}

export type effect = () => void;

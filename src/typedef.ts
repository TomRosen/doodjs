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

export type effect = () => void;

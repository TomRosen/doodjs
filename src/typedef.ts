export interface Directive {
	name: string;
	fn: (ctx: DirectiveContext, target?: DoodData) => void;
}

export interface DoodData {
	[key: string]: any;
}

export interface DirectiveContext {
	el: Element;
	expr: string;
	args?: string[];
	modiefiers?: Record<string, boolean>;
	run: (expression?: string) => any;
}

export type effect = () => void;

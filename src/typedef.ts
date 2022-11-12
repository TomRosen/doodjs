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
	modiefiers?: string[];
	run: (expression?: string, event?: Event) => any;
}

export type effect = () => void;

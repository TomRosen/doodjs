export interface Directive {
	name: string;
	fn: (data: DirectiveContext, target: Object) => void;
}

/* export interface DirectiveData {
	node: Element;
	value: string; //inline expression
}

export interface DirectiveWithData {
	name: string;
	fn: (ctx: DirectiveData, target: Object) => void;
	ctx: DirectiveContext;
} */

export interface DoodVariable {
	name: string;
	initial: any;
	value: any;
	snap?: any[];
}

export interface DoodData {
	[key: string]: any;
}

export interface DirectiveContext {
	el: Element;
	expr: string;
	args?: string[];
	modiefiers?: Record<string, boolean>;
	run: (e?: string) => void;
}

export type effect = () => void;

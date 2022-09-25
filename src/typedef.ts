export interface Directive {
	name: string;
	fn: (data: DirectiveData, target: Object) => void;
}

export interface DirectiveData {
	node: Element;
	value: string; //inline expression
}

export interface DirectiveWithData {
	name: string;
	fn: (data: DirectiveData, target: Object) => void;
	data: DirectiveData;
}

export interface DoodVariable {
	name: string;
	observers: DirectiveWithData[];
	initial: any;
	value: any;
	snap?: any[];
}

export interface DoodData {
	[key: string]: any;
}

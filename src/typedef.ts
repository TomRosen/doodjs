export interface Directive {
	name: string;
	fn: (data: DirectiveData, target: Object) => void;
}

export interface DirectiveData {
	node: Element;
	value: string; //inline expression
}

export interface DoodVariable {
	name: string;
	initial: any;
	value: any;
	snap?: [any];
}

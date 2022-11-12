export function getAttribute(el: Element, attr: string): string {
	let expr: string = el.getAttribute(attr) || '';
	el.removeAttribute(attr);
	return expr;
}

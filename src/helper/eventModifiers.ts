export const eventModifiers: Record<string, (e: Event) => void | boolean> = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !(e as KeyboardEvent).ctrlKey,
	shift: (e) => !(e as KeyboardEvent).shiftKey,
	alt: (e) => !(e as KeyboardEvent).altKey,
	meta: (e) => !(e as KeyboardEvent).metaKey,
	left: (e) => 'button' in e && (e as MouseEvent).button !== 0,
	middle: (e) => 'button' in e && (e as MouseEvent).button !== 1,
	right: (e) => 'button' in e && (e as MouseEvent).button !== 2,
	exact: (e) =>
		eventModifiers.left(e) ||
		eventModifiers.right(e) ||
		eventModifiers.middle(e),
};

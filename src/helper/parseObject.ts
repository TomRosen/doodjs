export function toStyleString(obj: Record<string, any>): string {
	return Object.entries(obj)
		.map(([key, value]) => `${key}: ${value}`)
		.join(';');
}

export function toClassString(obj: Record<string, any>): string {
	return Object.entries(obj)
		.filter(([_, value]) => value)
		.map(([key]) => key)
		.join(' ');
}

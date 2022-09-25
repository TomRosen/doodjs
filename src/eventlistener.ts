import { DoodData } from './typedef';

export const addModelEventListener = (
	node: HTMLElement,
	key: string,
	dood_data: DoodData
) => {
	node.addEventListener('input', (e: Event) => {
		dood_data[key] = (<HTMLInputElement>e.target).value;
	});
};

export const walkDOM = (
	main: Element,
	//data: Object,
	dood_data: Object //proxy
) => {
	/* var arr = {};
	let data: Object = { ...dood_data }; //convert proxy to object, maybe there is a better way, must be tested
	var loop = function (main: Element) {
		do {
			if (main.nodeType != 1) continue;
			if (main.hasAttribute('ignore')) continue;
			directives.forEach((att) => {
				if (main.hasAttribute(att)) {
					Object.entries(
						parse_attribute(main, main.getAttribute(att), data)
					).forEach(([key, value]) => {
						if (!(key in arr)) arr[key] = {};
						if (att == 'model') addModelEvent(main, key, dood_data);
						arr[key][att] =
							arr[key][att]?.length > 0 ? [...arr[key][att], value] : [value];
					});
				}
			});
			if (main.hasChildNodes()) loop(main.firstChild);
		} while ((main = main.nextSibling));
	};
	loop(main);
	return arr; */
};

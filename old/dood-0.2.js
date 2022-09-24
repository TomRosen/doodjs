let directives = ['model', 'show', 'text', 'html', 'effect'];
function init(data) {
	let dood_map = {};
	let variable_indexes = {};
	let proxyHandlers = {
		model: (arr, t) => {
			arr?.forEach(
				(model) => (model.node.value = eval(`with(t){${model.value}}`))
			);
		},
		show: (arr, t) => {
			arr?.forEach((show) => {
				if (eval(`with(t){${show.value}}`)) show.node.style.display = 'block';
				else show.node.style.display = 'none';
			});
		},
		text: (arr, t) => {
			arr?.forEach(
				(text) => (text.node.textContent = eval(`with(t){${text?.value}}`))
			);
		},
		html: (arr, t) => {
			arr?.forEach(
				(html) => (html.node.innerHTML = eval(`with(t){${html?.value}}`))
			);
		},
		effect: (arr, t) => {
			arr?.forEach((effect) => eval(`with(t){${effect.value}}`));
		},
	};
	let map = {};
	let dood_data = new Proxy(data, {
		set: (target, prop, value) => {
			target[prop] = value;
			Object.entries(map[prop] || {}).forEach(([key, value]) => {
				proxyHandlers[key](value, target);
			});
			return true;
		},
	});
	console.log(typeof dood_data);
	map = walkDOM(document.body, data, dood_data);
	Object.entries(data).forEach(([key, value]) => (dood_data[key] = value));

	return dood_data;
}

function parse_attribute(el, attribute, data) {
	let map = {};
	let used_attributes = [];
	let test_data = new Proxy(data, {
		get: (target, prop) => {
			if (!used_attributes.includes(prop) && prop in target)
				used_attributes.push(prop);
			return target[prop];
		},
	});
	eval(`with(test_data){${attribute}}`);
	for (att of used_attributes) {
		map[att] = { node: el, value: attribute };
	}
	return map;
}

function walkDOM(main, data, dood_data) {
	var arr = {};
	var loop = function (main) {
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
	return arr;
}

function addModelEvent(el, model, data) {
	el.addEventListener('input', (e) => {
		data[model] = e.target.value;
	});
}

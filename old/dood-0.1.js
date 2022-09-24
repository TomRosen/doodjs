function init(data) {
	let proxyHandlers = [];
	let map = {
		model: {},
		show: {},
		text: {},
		html: {},
		effect: {},
	};
	let osml_data = new Proxy(data, {
		set: (target, prop, value) => {
			target[prop] = value;
			for (let handler of proxyHandlers) {
				handler(target, prop, value);
			}
			return true;
		},
	});
	proxyHandlers.push((t, p, _) => {
		map['model'][p]?.forEach(
			(model) => (model.node.value = eval(`with(t){${model.value}}`))
		);
	});
	proxyHandlers.push((t, p, _) => {
		map['show'][p]?.forEach((show) => {
			if (eval(`with(t){${show.value}}`)) show.node.style.display = 'block';
			else show.node.style.display = 'none';
		});
	});
	proxyHandlers.push((t, p, _) => {
		map['text'][p]?.forEach(
			(text) => (text.node.textContent = eval(`with(t){${text?.value}}`))
		);
	});
	proxyHandlers.push((t, p, _) => {
		map['html'][p]?.forEach(
			(html) => (html.node.innerHTML = eval(`with(t){${html?.value}}`))
		);
	});
	proxyHandlers.push((t, p, _) => {
		map['effect'][p]?.forEach((effect) => eval(`with(t){${effect.value}}`));
	});
	Object.keys(map).forEach(
		(key) => (map[key] = parse_attribute(map, key, data, osml_data))
	);
	Object.entries(data).forEach(([key, value]) => (osml_data[key] = value));
	return osml_data;
}

function parse_attribute(map, key, data, osml_data) {
	let elements = document.querySelectorAll(`[${key}]`);
	let used_attributes = [];
	let test_data = new Proxy(data, {
		get: (target, prop) => {
			if (!used_attributes.includes(prop) && prop in target)
				used_attributes.push(prop);
			return target[prop];
		},
	});
	for (let el of elements) {
		let name = el.getAttribute(key);
		if (key == 'model') {
			el.addEventListener('change', (e) => {
				osml_data[name] = e.target.value;
			});
		}
		eval(`with(test_data){${name}}`);
		for (att of used_attributes) {
			let obj = { node: el, value: name };
			map[key][att] =
				map[key][att]?.length > 0 ? [...map[key][att], obj] : [obj];
		}
		used_attributes = [];
	}
	return map[key];
}

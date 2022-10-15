(function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload')) return;
	for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e);
	new MutationObserver((e) => {
		for (const a of e)
			if (a.type === 'childList')
				for (const s of a.addedNodes)
					s.tagName === 'LINK' && s.rel === 'modulepreload' && o(s);
	}).observe(document, { childList: !0, subtree: !0 });
	function n(e) {
		const a = {};
		return (
			e.integrity && (a.integrity = e.integrity),
			e.referrerpolicy && (a.referrerPolicy = e.referrerpolicy),
			e.crossorigin === 'use-credentials'
				? (a.credentials = 'include')
				: e.crossorigin === 'anonymous'
				? (a.credentials = 'omit')
				: (a.credentials = 'same-origin'),
			a
		);
	}
	function o(e) {
		if (e.ep) return;
		e.ep = !0;
		const a = n(e);
		fetch(e.href, a);
	}
})();
const fn_cache = Object.create(null),
	run = (r, t, n) => {
		const o = fn_cache[t] || (fn_cache[t] = createFunction(t));
		try {
			return o(r, n);
		} catch (e) {
			console.error(e);
		}
	};
function createFunction(r) {
	try {
		return new Function('$data', '$el', `with($data){${r}}`);
	} catch (t) {
		return console.error(`${t.message} in expression: ${r}`), () => {};
	}
}
const text = (r, t) => {
		const { node: n, value: o } = r;
		n.innerText = run(t, `return ${o}`, n);
	},
	show = (r, t) => {
		const { node: n, value: o } = r;
		run(t, `return ${o}`, n)
			? (n.style.display = 'block')
			: (n.style.display = 'none');
	},
	model = (r, t) => {
		const { node: n, value: o } = r;
		n.value = run(t, `return ${o}`, n);
	},
	ref = (r) => {},
	bind = (r, t) => {
		const { node: n, value: o } = r;
		n.value = run(t, `return ${o}`, n);
	},
	effect = (data, target) => {
		const { value } = data;
		eval(`with(target) { ${value} }`);
	},
	html = (r, t) => {
		const { node: n, value: o } = r;
		n.innerHTML = run(t, `return ${o}`, n);
	},
	d_if = (data, target) => {
		const { node, value } = data,
			result = eval(`with(target) { ${value} }`);
		result ? (node.style.display = 'block') : (node.style.display = 'none');
	},
	directives = [
		{ name: 'model', fn: model },
		{ name: 'if', fn: d_if },
		{ name: 'ref', fn: ref },
		{ name: 'show', fn: show },
		{ name: 'bind', fn: bind },
		{ name: 'effect', fn: effect },
		{ name: 'text', fn: text },
		{ name: 'html', fn: html },
	],
	parse_attribute = (r, t, n) => {
		t = t || '';
		let o = new Map(),
			e = [],
			a = new Proxy(n, {
				get: (s, l) => (!e.includes(l) && l in s && e.push(l), s[l]),
			});
		new Function('with(this){' + t + '}').call(a);
		for (let s of e) o.set(s, { node: r, value: t });
		return o;
	},
	addModelEventListener = (r, t, n) => {
		r.addEventListener('input', (o) => {
			n[t] = o.target.value;
		});
	},
	walkDOM = (r, t) => {
		let n = { ...t };
		var o = function (e) {
			do {
				if ((console.log(e), e === null)) return;
				e.nodeType == 1 &&
					(e.hasAttribute('ignore') ||
						(directives.forEach((a) => {
							const { name: s, fn: l } = a;
							e.hasAttribute(s) &&
								parse_attribute(e, e.getAttribute(s), n).forEach((c, i) => {
									variable_map
										.get(i)
										.observers.push({ name: s, fn: l, data: c }),
										s === 'model' && addModelEventListener(e, i, t);
								});
						}),
						e.hasChildNodes() && e != null && o(e.firstElementChild)));
			} while (e != null && (e = e.nextElementSibling));
		};
		o(r);
	};
let variable_map = new Map();
const init = (r) => {
	Object.entries(r).forEach(([n, o]) => {
		variable_map.set(n, { name: n, initial: o, value: o, observers: [] });
	});
	const t = new Proxy(r, {
		set: (n, o, e) => (
			(n[o] = e),
			variable_map.has(o) &&
				((variable_map.get(o).value = e),
				variable_map.get(o).observers.forEach((a) => {
					a.fn(a.data, n);
				})),
			!0
		),
	});
	return walkDOM(document.body, t), t;
};
let time = performance.now(),
	data = init({ count: 0, divider: 3 });
console.log('init time: ', performance.now() - time);
window.data = data;
setInterval(() => data.count++, 1e3);

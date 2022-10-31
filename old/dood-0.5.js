(function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload')) return;
	for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
	new MutationObserver((o) => {
		for (const c of o)
			if (c.type === 'childList')
				for (const l of c.addedNodes)
					l.tagName === 'LINK' && l.rel === 'modulepreload' && r(l);
	}).observe(document, { childList: !0, subtree: !0 });
	function n(o) {
		const c = {};
		return (
			o.integrity && (c.integrity = o.integrity),
			o.referrerpolicy && (c.referrerPolicy = o.referrerpolicy),
			o.crossorigin === 'use-credentials'
				? (c.credentials = 'include')
				: o.crossorigin === 'anonymous'
				? (c.credentials = 'omit')
				: (c.credentials = 'same-origin'),
			c
		);
	}
	function r(o) {
		if (o.ep) return;
		o.ep = !0;
		const c = n(o);
		fetch(o.href, c);
	}
})();
let f = null;
const d = (e, t) => {
		var n, r, o;
		return (
			i.has(e)
				? ((n = i.get(e)) != null && n.has(t)) ||
				  (r = i.get(e)) == null ||
				  r.set(t, new Set())
				: i.set(e, new Map()),
			(o = i.get(e)) == null ? void 0 : o.get(t)
		);
	},
	h = (e, t) => {
		if (f) {
			const n = d(e, t);
			n == null || n.add(f);
		}
	},
	p = (e, t) => {
		var n;
		(n = d(e, t)) == null || n.forEach((r) => r());
	},
	s = (e) => {
		const t = () => {
			(f = t), e(), (f = null);
		};
		t();
	},
	g = ({ el: e, run: t, expr: n }) => {
		s(() => {
			e.innerText = t(`return ${n}`);
		});
	},
	w = ({ el: e, run: t, expr: n }) => {
		s(() => {
			t(`return ${n}`)
				? (e.style.display = 'block')
				: (e.style.display = 'none');
		});
	},
	y = ({ el: e, run: t, expr: n }, r) => {
		n in r
			? e.addEventListener('input', (o) => {
					const c = o.target.value;
					r[n] = c;
			  })
			: console.error(`Property ${n}, in model, does not exist in target`),
			s(() => {
				e.value = t(`return ${n}`);
			});
	},
	$ = (e) => {
		try {
			a.set(e.expr, e.el);
		} catch (t) {
			console.error(`${t.message} while creating reference for ${e.expr}`);
		}
	},
	b = ({ el: e, run: t, expr: n }) => {
		s(() => {
			e.value = t(`return ${n}`);
		});
	},
	v = ({ run: e }) => {
		s(() => {
			e();
		});
	},
	E = ({ el: e, run: t, expr: n }) => {
		s(() => {
			e.innerHTML = t(`return ${n}`);
		});
	},
	L = (e) => {
		const { el: t, expr: n } = e;
		if (!n.trim()) {
			console.error('Expression in if directive is empty');
			return;
		}
		const r = t.parentElement;
		if (r === null) return;
		const o = document.createComment('if');
		r.insertBefore(o, t), r.removeChild(t), s(() => {});
	},
	M = (e) => {
		s(() => {});
	},
	O = [
		{ name: 'd-model', fn: y },
		{ name: 'd-if', fn: L },
		{ name: 'd-ref', fn: $ },
		{ name: 'd-show', fn: w },
		{ name: 'd-bind', fn: b },
		{ name: 'd-effect', fn: v },
		{ name: 'd-text', fn: g },
		{ name: 'd-html', fn: E },
		{ name: 'd-on', fn: M },
	],
	u = Object.create(null),
	x = (e, t, n) => {
		const r = u[t] || (u[t] = C(t));
		try {
			return r(e, Object.fromEntries(a), n);
		} catch (o) {
			console.error(o);
		}
	};
function C(e) {
	try {
		return new Function('$data', '$refs', '$el', `with($data){${e}}`);
	} catch (t) {
		return console.error(`${t.message} in expression: ${e}`), () => {};
	}
}
const A = (e, t, n) => ({ el: e, expr: t, run: (o = t) => x(n, o, e) }),
	N = (e, t) => {
		var n = function (r) {
			do {
				if (r === null) return;
				r.nodeType == 1 &&
					(r.hasAttribute('ignore') ||
						(O.forEach((o) => {
							const { name: c } = o;
							if (r.hasAttribute(c)) {
								let l = A(r, r.getAttribute(c), t);
								o.fn(l, t);
							}
						}),
						r.hasChildNodes() && r != null && n(r.firstElementChild)));
			} while (r != null && (r = r.nextElementSibling));
		};
		n(e);
	};
let i = new WeakMap(),
	a = new Map();
const P = (e) => {
	i.set(e, new Map());
	const t = new Proxy(e, {
		get: (n, r) => (h(n, r), n[r]),
		set: (n, r, o) => ((n[r] = o), p(n, r), !0),
	});
	return N(document.body, t), t;
};
let S = performance.now(),
	m = P({ count: 0, divider: 3 });
console.log('init time: ', performance.now() - S);
window.data = m;
setInterval(() => m.count++, 1e3);

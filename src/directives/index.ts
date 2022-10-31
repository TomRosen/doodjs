import { Directive } from '../typedef';

import { text } from './text';
import { show } from './show';
import { model } from './model';
import { ref } from './ref';
import { bind } from './bind';
import { effect } from './effect';
import { html } from './html';
import { d_if } from './if';
import { on } from './on';

export const directives: Directive[] = [
	{
		name: 'd-model',
		fn: model,
	},
	{
		name: 'd-if',
		fn: d_if,
	},
	{
		name: 'd-ref',
		fn: ref,
	},
	{
		name: 'd-show',
		fn: show,
	},
	{
		name: 'd-bind',
		fn: bind,
	},
	{
		name: 'd-effect',
		fn: effect,
	},
	{
		name: 'd-text',
		fn: text,
	},
	{
		name: 'd-html',
		fn: html,
	},
	{
		name: 'd-on',
		fn: on,
	},
];

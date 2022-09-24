import { Directive } from '../typedef';

import { text } from './text';
import { show } from './show';
import { model } from './model';
import { ref } from './ref';
import { bind } from './bind';
import { effect } from './effect';
import { html } from './html';
import { d_if } from './if';

export let directives: Directive[] = [
	{
		name: 'model',
		fn: model,
	},
	{
		name: 'if',
		fn: d_if,
	},
	{
		name: 'ref',
		fn: ref,
	},
	{
		name: 'show',
		fn: show,
	},
	{
		name: 'bind',
		fn: bind,
	},
	{
		name: 'effect',
		fn: effect,
	},
	{
		name: 'text',
		fn: text,
	},
	{
		name: 'html',
		fn: html,
	},
];

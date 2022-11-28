# dood

A simple JavaScript framework to add functionality to your HTML elements.

## Installation

Run `npm i` to install the dependencies. \
Run `npm run build` to build the project.

## Usage

```javascript
import { init } from '/dood.js';
let dood = init({});
```

Provide a object wich will contain your reactive data available in your HTML elements.

## Directives

### `d-text`

```html
<div d-text="message"></div>
```

Will display the value of `message` in the element.

### `d-html`

```html
<div d-html="message"></div>
```

Will display the value of `message` in the element as HTML.

### `d-show`

```html
<div d-show="showMessage"></div>
```

Will display the element if `showMessage` is `true`.

### `d-model`

```html
<input type="text" d-model="value" />
```

Will bind the value of the input to the value of `value`.

### `d-for`

```html
<div d-for="item in items">
	<div d-text="item"></div>
</div>
```

Will display the element for each item in `items`.

### `d-if`

```html
<div d-if="showMessage">
	<div d-text="message"></div>
</div>
```

Will display the element if `showMessage` is `true`.
The difference to `d-show` is that the element will be removed if `showMessage` is `false`.

### `d-on`

```html
<button d-on:click="clickHandler">Click me</button>
```

Will call the function `clickHandler` when the button is clicked.
Arguments and Modifiers are supported.

### `d-bind`

```html
<div d-bind:class="class"></div>
```

Will bind the value of `class` to the class attribute of the element.

### `d-ref`

```html
<div d-ref="tag"></div>
```

Will add the element to the `refs` object.\
Element will be available via `$refs.tag`.

### `d-effect`

```html
<div d-effect="$el.innerText = message"></div>
```

Will re-run the effect when the value of parameters changes.

### `d-ignore`

```html
<div d-ignore></div>
```

Elements with the `d-ignore` directive will be ignored by dood.

## Arguments

```html
<button d-on:click="clickHandler($event, $el)">Click me</button>
```

`$event` will contain the event object.\
`$el` will contain the element.

## Modifiers

```html
<button d-on:click.stop="clickHandler">Click me</button>
```

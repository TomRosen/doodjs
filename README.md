# DoodJS

<!--toc:start-->

- [DoodJS](#doodjs)
  - [State](#state)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Options](#options)
  - [Directives](#directives)
    - [`d-text`](#d-text)
    - [`d-html`](#d-html)
    - [`d-show`](#d-show)
    - [`d-model`](#d-model)
    - [`d-for`](#d-for)
    - [`d-if`](#d-if)
    - [`d-on`](#d-on)
    - [`d-bind`](#d-bind)
    - [`d-ref`](#d-ref)
    - [`d-effect`](#d-effect)
    - [`d-ignore`](#d-ignore)
  - [DoodJS variables](#doodjs-variables)
  - [Modifiers](#modifiers)
  - [Arguments](#arguments)
  <!--toc:end-->

A simple JavaScript framework to add functionality to your HTML elements.

## State

- The framework is currently in a very early state.
- Different scopes are currently not supported yet, just one scope will be created.

## Usage

DoodJS can simply be loaded from CDN:

```javascript
import { init } from 'cdn url';
let dood = init({});
```

Provide a object wich will contain your reactive data available in your HTML elements.

### Options

The `init` function can take a options object as a second argument.
The following options are available:

- **`root`** defines the root of DoodJS on the DOM. Standard query selector can be used.

```javascript
let dood = init({}, { root: '#main' });
```

## Directives

### `d-text`

Will set given value as elements innerText.

```html
<div d-text="'Hello, World!'"></div>
```

### `d-html`

Will set given value as elements innerHTML.

```html
<div d-html="myHTML"></div>
```

### `d-show`

Will display the element if given expression is `true`.

```html
<div d-show="count > 10"></div>
```

### `d-model`

Will bind the value of the input to the value of the given variable.

```html
<input type="text" d-model="myInput" />
```

### `d-for`

Will render list of elements. The loop can contain multiple HTML elements.

```html
<div d-for="item of items">
	<div d-text="item"></div>
</div>
```

`d-for` can also itterate also over the keys of the given object.

```html
<div d-for="(item,key) of items"
  <div d-text="'Key: '+key"></div>
  <div d-text="'Item: '+item"></div>
</div>
```

### `d-if`

Will display the element if expression is `true`.
The difference to `d-show` is that the element will be removed from the DOM if the expression is `false`.

```html
<div d-if="showMessage">
	<div d-text="message"></div>
</div>
```

### `d-on`

Will add an event handler with the given function.
Modifiers and Arguments are supported.

```html
<button d-on:click="clickHandler">Click me</button>
```

### `d-bind`

Will bind given value the specefied propertie of the element.

```html
<div d-bind:class="class"></div>
<div d-bind:style="{color: error ? 'Red' : 'Green'}"
```

### `d-ref`

Will add the element to the `refs`.\
Element will be available via `$refs.tag`.

```html
<div d-ref="tag"></div>
<div d-effect="$refs.tag.innerText = 'Hello, World!'"
```

### `d-effect`

Will re-run the effect when the value of parameters changes.

```html
<div d-effect="$el.innerText = message"></div>
```

### `d-ignore`

Elements with the `d-ignore` directive will be ignored by DoodJS.

```html
<div d-ignore></div>
```

## DoodJS variables

There are a list of variables that are available in all directive functions.

- `$el` can be used to access the current element.
- The `$refs` object can be used to access all elements referenced by `d-ref`.
- The `$args` array contains contains all arguments provided by directive, if any.

## Modifiers

## Arguments

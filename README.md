# DoodJS

<!--toc:start-->

- [DoodJS](#doodjs)
  - [State](#state)
  - [Usage](#usage)
    - [Options](#options)
    - [Build from source](#build-from-source)
  - [Directives](#directives)
    - [`d-data`](#d-data)
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
    - [`inline`](#inline)
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

```html
<script src="https://unpkg.com/doodjs"></script>
<script>
  let dood = Dood.init({});
</script>
```

or as a module:

```javascript
import { init } from "https://unpkg.com/doodjs?module";
let dood = init({
  yourData: value,
});
```

Provide a object wich will contain your reactive data available in your HTML elements.

### Options

The `init` function can take a options object as a second argument.
The following options are available:

- **`root`** defines the root of DoodJS on the DOM. Standard query selector can be used.

```javascript
let dood = init({}, { root: "#main" });
```

### Build from source

- Clone this repository.
- Run `npm install` and `npm run build`.
- The script is now available in the `dist/` directory.

## Directives

### `d-data`

Allows to declare a new context. The data will be available on the element the directive is attached to and on all child elements.

```html
<div d-data="{hello: 'world'}">
  <div d-text="hello"></div>
</div>
```

### `d-text`

Will set the given value as elements innerText.

```html
<div d-text="'Hello, World!'"></div>
```

### `d-html`

Will set the given value as elements innerHTML.

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

Will render a list of elements, `d-for` can contain multiple HTML elements.

```html
<div d-for="item of items">
  <div d-text="item"></div>
</div>
```

`d-for` can also itterate over the keys of the given object.

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

Will bind the given value the specefied property of the element.

```html
<div d-bind:class="class"></div>
<div d-bind:style="{color: error ? 'Red' : 'Green'}"
```

### `d-ref`

Will add the element to the `refs`.\
Element will be available via `$refs`.

```html
<div d-ref="tag"></div>
<div d-effect="$refs.tag.innerText = 'Hello, World!'"
```

### `d-effect`

Will re-run the effect when a value in the expression changes.

```html
<div d-effect="$el.innerText = message"></div>
```

### `d-ignore`

Elements with the `d-ignore` directive will be ignored during initialization.

```html
<div d-ignore></div>
```

### `inline`

Code inside `{{`/`}}` brackets will automatically be evaluated and is also reactive.

```html
<div d-data="{message: 'Hello, World!'}"
    <div>Message: {{message}}</div>
</div>
```

## magic variables

There are a list of variables that are available in all directive functions.

- `$el` can be used to access the current element.
- The `$refs` object can be used to access all elements referenced by `d-ref`.
- The `$args` array contains contains all arguments provided by directive, if any.

## Modifiers

## Arguments

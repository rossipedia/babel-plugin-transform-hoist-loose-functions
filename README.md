# babel-plugin-transform-hoist-loose-functions

This plugin hoists functions in loose-mode to their enclosing function or
program scope.

This plugin was primarily developed to support using [babel-minify][1] on
non-strict ES5 and below. Currently babel-minify has [problems][2] non-strict
nested functions.

[1]: https://github.com/babel/minify
[2]: https://github.com/babel/minify/issues/682

## Example

**In**

```javascript
function foo() {
  if (a) {
    function bar() {}
  }
}
```

**Out**

```javascript
function foo() {
  function bar() {}

  if (a) {}
}
```

## Installation

```sh
npm install babel-plugin-transform-hoist-loose-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-hoist-loose-functions"]
}
```

### Via CLI

```sh
babel --plugins transform-hoist-loose-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-hoist-loose-functions"]
});
```

### Options

None

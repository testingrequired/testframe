# @testingrequired/tf

Build your own test framework.

## Features

- Testing style agnostic
- Most batteries included
- Extendable

## Getting Started

### Install

[![npm version](https://badge.fury.io/js/%40testingrequired%2Ftf.svg)](https://badge.fury.io/js/%40testingrequired%2Ftf)

```bash
$ npm i -D @testingrequired/tf@latest
```

or

```bash
$ yarn add -D @testingrequired/tf@latest
```

### Customize

Build and customize the framework using middlewear.

```javascript
// ./tf.js

import tf, { run, middlewear } from "@testingrequired/tf";

const { defaults, matchTestFiles, suiteSyntax } = middlewear;

run(tf(defaults, matchTestFiles("./**/*.test.js"), suiteSyntax));
```

### Script

```javascript
// package.json

{
  ...package,
  "scripts": {
    "test": "node ./tf.js"
  }
}
```

### Write

```javascript
// tests/example.test.js

let value = 0;

beforeEach(() => {
  value++;
});

test(`should have incremented`, () => assert(value == 1));
```

### Run

```bash
$ npm test
```

## Middlewear

See [middlewear](MIDDLEWEAR.md).

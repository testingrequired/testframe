# @testingrequired/tf 🧪

[![Build Status](https://travis-ci.org/testingrequired/tf.svg?branch=master)](https://travis-ci.org/testingrequired/tf)

Build your test rig.

## Features

- Testing style agnostic
- Most batteries included
- Effortlessly extendable

## Getting Started

### Install

[![npm version](https://badge.fury.io/js/%40testingrequired%2Ftf.svg)](https://badge.fury.io/js/%40testingrequired%2Ftf)

```bash
$ npm i -D @testingrequired/tf@latest
```

#### Supported Node Versions

`latest` & `lts`

### Create Framework File

The framework file is the core of your framework. Behavior is defined using piplines and middlewear.

```javascript
// ./bin/tf.js
import { run, pipeline, middlewear } from "@testingrequired/tf";

const { starter, matchTestFiles, specSyntax, mock } = middlewear;

run(
  pipeline(starter, matchTestFiles("./tests/**/*.test.js"), specSyntax, mock)
);
```

#### Test Syntax

Different pipelines can use different test syntax based on the testing needs. The two build in syntax options are [specSyntax](MIDDLEWEAR.md#-specsyntax) and [suiteSyntax](MIDDLEWEAR.md#-suitesyntax).

### Wire Test Script

Framework files are runnable by node.

```javascript
// package.json

{
  ...package,
  "scripts": {
    "test": "node -r esm ./bin/tf.js"
  }
}
```

This example uses `esm` to support es modules inside your framework file.

### Write Tests

Test syntax will depend on the middlewear used. The following example uses the `specSyntax` middlewear.

```javascript
// tests/example.test.js

let mockFn;

beforeEach(() => {
  mockFn = mock.func();
});

afterEach(() => {
  mock.reset();
});

describe("mock function", () => {
  let symbol;

  beforeEach(() => {
    symbol = Symbol();
    mockFn(symbol);
  });

  it("should be called", () => verify(mockFn(symbol)));
});
```

### Run Tests

```bash
$ npm test
```

### Example Project

https://github.com/testingrequired/tf-example

## Middlewear

See [middlewear](MIDDLEWEAR.md).

## Core Concepts

See [anatomy](ANATOMY.md).

## Contributing

See [development](DEVELOPMENT.md).

## Built With

- [typescript](https://www.typescriptlang.org/)
- [yargs](https://github.com/yargs/yargs)
- [testdouble](https://github.com/testdouble/testdouble.js/)
- [chancejs](https://chancejs.com/)

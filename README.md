# @testingrequired/tf

## Features

- Testing style agnostic
- Easy to understand codebase
- Most batteries included
- Extendable

## Built With

- [typescript](https://www.typescriptlang.org/)
- [yargs](https://github.com/yargs/yargs)
- [testdouble](https://github.com/testdouble/testdouble.js/)
- [chancejs](https://chancejs.com/)

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

### Create Framework File

The framework file is the core of your framework. Behavior is defined using piplines and middlewear.

```javascript
// ./bin/tf.js
import { run, pipeline, middlewear } from "@testingrequired/tf";

const { defaults, matchTestFiles, specSyntax, junit, mock } = middlewear;

run(
  pipeline(
    defaults,
    matchTestFiles("./tests/**/*.test.js"),
    specSyntax,
    junit("junit.xml"),
    mock
  )
);
```

#### Middlewear

Middlewear define isolated pieces of behavior around setup (finding test files, loading tests, reading command line arguments) and results (running test files, generating junit reports, exiting on failure).

#### Pipeline

Pipelines compose middlewear together. Each pipeline's setup and results are independent of other pipelines.

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
  beforeEach(() => mockFn());

  it("should be called", () => mock.verify(mockFn()));
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

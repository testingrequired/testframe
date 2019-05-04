# @testingrequired/tf

Build your own test framework.

## Why?

Test frameworks are inheritly complex but often times their code bases are nearly impossible to parse. A litmus test for this is looking for where test functions are called and where results are collected. This is difficult when looking for functionality not covered in the documentation (e.g. do something on each test failure).

When creating this framework the goals were to make the code base easy to understand, isolate each piece of functionality, and to make the extendability implementation composable. It should be easy to debug your way through the framework's execution.

## Features

- Testing style agnostic
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

Compose and configure [middlewear](#middlewear) in your framework file.

```javascript
// ./bin/tf.js
import tf, { run, middlewear } from "@testingrequired/tf";

const { defaults, matchTestFiles, specSyntax, junit } = middlewear;

run(
  tf(
    defaults,
    matchTestFiles("./tests/**/*.test.js"),
    specSyntax,
    junit("junit.xml")
  )
);
```

### Wire Test Script

Framework files are runnable by node. The following example uses `esm` to support es modules inside your framework file.

```javascript
// package.json

{
  ...package,
  "scripts": {
    "test": "node -r esm ./bin/tf.js"
  }
}
```

### Write Tests

Test syntax will depend on the middlewear used. The following example uses the `specSyntax` middlewear.

```javascript
// tests/example.test.js

let value = 0;

beforeEach(() => {
  value++;
});

test(`should have incremented`, () => assert(value == 1));
```

### Run Tests

```bash
$ npm test
```

### Example Project

https://github.com/testingrequired/tf-example

## Middlewear

See [middlewear](MIDDLEWEAR.md).

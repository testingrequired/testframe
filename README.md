# @testingrequired/tf

[![Build Status](https://travis-ci.org/testingrequired/tf.svg?branch=master)](https://travis-ci.org/testingrequired/tf)

A testing framework.

## Features

- Testing style agnostic
- Effortlessly extendable
- [Most batteries included](MIDDLEWEAR.md)

## Note

This is not a production ready project yet. Breaking changes should be expected.

## Getting Started

### Install

[![npm version](https://badge.fury.io/js/%40testingrequired%2Ftf.svg)](https://badge.fury.io/js/%40testingrequired%2Ftf)

```bash
$ npm i -D @testingrequired/tf@latest
```

#### Supported Node Versions

`latest` & `lts`

### Configure

The framework makes no assumptions about what or how you're testing. You will need to define that behavior using [middlewear](MIDDLEWEAR.md) in an executable node file:

```javascript
// ./bin/tf.js

import { run, pipeline, middlewear } from "@testingrequired/tf";

const { starter, matchTestFiles, specSyntax } = middlewear;

run(pipeline(starter, matchTestFiles("./tests/**/*.spec.js"), specSyntax));
```

The `pipeline` function is how you define middlewear for a specific set of tests. The `matchTestFiles(...patterns)` middlewear. Next `specSyntax` defined how to convert those test files in to tests. The `starter` middlewear is optional but provides common testing functionality out of the box.

The `run` function accepts one or more instances of `pipeline` so you can define multiple types of tests you need to run:

```javascript
import { run, pipeline, middlewear } from "@testingrequired/tf";

const { starter, matchTestFiles, specSyntax, suiteSyntax, random } = middlewear;

run(
  pipeline(starter, matchTestFiles("./tests/**/*.spec.js"), specSyntax),
  pipeline(starter, matchTestFiles("./tests/**/*.test.js"), suiteSyntax, random)
);
```

Here we define a second set of tests `"./tests/**/*.test.js"` that use the `suiteSyntax` and `random` middlewear instead.

### Wire Test Script

Framework files are runnable by node.

```javascript
// ./package.json

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
// ./tests/example.spec.js

describe("mock function", () => {
  let value = 0;

  beforeEach(() => {
    value++;
  });

  it("should equal correct value", () => assert(value === 1));
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

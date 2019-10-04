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

### Executable

The framework doesn't provide an executable so you'll need to create one: `./bin/tf.js`

```javascript
import { run } from "@testingrequired/tf";

run();
```

### Configure

This will do nothing so far. The framework makes zero assumptions about how you want it to behave. Unit testing, mocking, what your test syntax looks like. You will need to define that behavior using [middlewear](MIDDLEWEAR.md) in the executable:

```javascript
import { run, pipeline, middlewear } from "@testingrequired/tf";

const { starter, matchTestFiles, specSyntax } = middlewear;

run(pipeline(starter, matchTestFiles("./tests/**/*.spec.js"), specSyntax));
```

The [`pipeline`](ANATOMY.md#pipeline) composes middlewear to configure and run your tests. Here [`matchTestFiles`](MIDDLEWEAR.md#-matchtestfilespatterns) defines how to find the test files while [`specSyntax`](MIDDLEWEAR.md#-specsyntax) defines how to read the them.

[`starter`](MIDDLEWEAR.md#-starter) is an optional but recommended middlewear that provides common testing functionality: [randomize test order](MIDDLEWEAR.md#-randomize), [run tests](MIDDLEWEAR.md#-runner), [report results](MIDDLEWEAR.md#-resultsReporter) and more.

### Wire Test Script

```javascript
{
  ...package,
  "scripts": {
    "test": "node -r esm ./bin/tf.js"
  }
}
```

This example uses [`esm`](https://www.npmjs.com/package/esm) to support ES modules in your executable.

### Write Tests

Create a test file: `./tests/example.spec.js`

```javascript
describe("increment value", () => {
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

See a simple implementation: https://github.com/testingrequired/tf-example

### Next Steps

#### Middlewear

Look through the growing list of available [middlewear](MIDDLEWEAR.md) to build the testing functionality your project needs.

#### More In Depth

The [anatomy](ANATOMY.md) documentation explains how the framework is structured and how middlewear works. This would be a good place to start if you want to write custom middlewear.

## Contributing

See [development](DEVELOPMENT.md).

## Built With

- [typescript](https://www.typescriptlang.org/)
- [yargs](https://github.com/yargs/yargs)
- [testdouble](https://github.com/testdouble/testdouble.js/)
- [chancejs](https://chancejs.com/)

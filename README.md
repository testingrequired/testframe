# testframe

[![Build Status](https://travis-ci.org/testingrequired/testframe.svg?branch=master)](https://travis-ci.org/testingrequired/testframe)

A testing framework.

## Features

- [Testing behavior agnostic](#why)
- [Most batteries included](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md)
- [Effortlessly extendable](https://github.com/testingrequired/testframe/blob/master/WRITING_MIDDLEWARE.md)

## Note

This is not a production ready project yet. Breaking changes should be expected.

## Getting Started

### Install

[![npm version](https://badge.fury.io/js/%40testingrequired%2Ftestframe.svg)](https://badge.fury.io/js/%40testingrequired%2Ftestframe)

```bash
$ npm i -D @testingrequired/testframe@latest
```

#### Supported Node Versions

`latest` & `lts`

### Executable

The framework doesn't provide an executable so you'll need to create one: `./bin/testframe.js`

```javascript
import { run } from "@testingrequired/testframe";

run();
```

### Configure

This will do nothing so far. The framework makes zero assumptions about how you want it to behave. Unit testing, mocking, what your test syntax looks like. You will need to define that behavior using [middleware](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md) in the executable:

```javascript
import { run, config, middleware } from "@testingrequired/testframe";

const { starter, matchTestFiles, specSyntax } = middleware;

run(config(starter, matchTestFiles("./tests/**/*.spec.js"), specSyntax));
```

A [`config`](https://github.com/testingrequired/testframe/blob/master/ANATOMY.md#config) composes middleware to define that behavior. Here [`matchTestFiles`](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md#-matchtestfilespatterns) defines how to find the test files while [`specSyntax`](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md#-specsyntax) defines how to read the them.

[`starter`](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md#-starter) is an optional middleware that bundles some of the core middlewares to get you started: [randomize test order](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md#-randomize), [run tests](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md#-runner), [report results](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md#-resultsReporter) and more. Of course you can skip this and define exactly what middleware you wish to use.

### Wire Test Script

```javascript
{
  ...package,
  "scripts": {
    "test": "node -r esm ./bin/testframe.js"
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

See a simple implementation: [https://github.com/testingrequired/tf-example](https://github.com/testingrequired/tf-example)

## Why

There are several great test frameworks out there (see: jest, mocha, jasmine) that will likely fit your needs. They will definitely fit your unit testing needs and their documentation/support is strong. They are also production ready. You're highly encouraged to use those if they work for you and the tests you're writing.

This framework is different in that it's not a unit testing framework. It tries not to make any assumptions about the tests you are writing. Instead you're choosing, building, mixing and matching behaviors that work for your tests. Unit, integration, end to end, API contract tests. Any test syntax, expose integrations through global variables in tests, report results.

These behaviors as defined as middleware functions. There are [wide range](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md) of middleware included but it's easy [write your own](https://github.com/testingrequired/testframe/blob/master/WRITING_MIDDLEWARE.md).

## Next Steps

### Middleware

Look through the growing list of available [middleware](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md) to build the testing functionality your project needs.

### More In Depth

The [anatomy](https://github.com/testingrequired/testframe/blob/master/ANATOMY.md) documentation explains how the framework is structured and how middleware works. This would be a good place to start if you want to write custom middleware.

### Custom Middleware

Define the behavior required to run your tests by writing [custom middleware](https://github.com/testingrequired/testframe/blob/master/MIDDLEWARE.md).

### Contributing

See [development](https://github.com/testingrequired/testframe/blob/master/DEVELOPMENT.md).

## Built With

- [typescript](https://www.typescriptlang.org/)
- [yargs](https://github.com/yargs/yargs)
- [testdouble](https://github.com/testdouble/testdouble.js/)
- [chancejs](https://chancejs.com/)

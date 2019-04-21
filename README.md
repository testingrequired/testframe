# @testingrequired/tf

Build your own test framework.

## Features

- Multiple testing styles supported
- Most batteries included
- Extendable

## Getting Started

### Install

```bash
$ npm i -D @testingrequired/tf@latest
```

or

```bash
$ yarn add -D @testingrequired/tf@latest
```

### Choose Testing Style

There is built in support for different testing styles.

#### Test Suite

A flat test structure using `beforeEach`, `afterEach`, `test`. Tests are matched on `./tests/**/*.test.js` by default.

#### Spec

Nested test structure using `describe`, `beforeEach`, `afterEach`, `it`. Tests are matched on `./tests/**/*.spec.js` by default.

### Wire Test Command

```javascript
// package.json

{
  ...package,
  "scripts": {
    "test": "tf suite"
  }
}
```

### Write Some Tests

Here is a simple example of a test suite:

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

## Customization

See [customization](CUSTOMIZATION.md) on how to build your own test framework.
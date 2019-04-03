# @testingrequired/tf

Build your own test framework.

## Getting Started

### Install

```bash
$ npm install --only=dev @testingrequired/tf
```

### Script

```javascript
// package.json

{
  ...package,
  "scripts": {
    "test": "tf"
  }
}
```

### Write Tests

```javascript
// tests/example.test.js

let value;

beforeEach(() => {
  value = 10;
});

test(`example test`, ({ assert }) => assert.equal(value, 10));
```

### Run Tests

```bash
$ npm test
```

### Customize Framework

Use [middlewear](#middlewear) to customize the framework to your needs:

```javascript
// custom-tf.js
import tf, { defaults, compose, event } from "@testingrequired/tf";

export default tf(
  compose(
    event("test:failure", result => {
      console.log(`${result.description} failed`);
    }),
    defaults()
  )
);
```

#### Script

Wire them together using an npm script

```json
{
  "scripts": {
    "test": "tf ./my-tf-cli.js"
  }
}
```

## Middlewear

### defaults

Returns a default set of middlewear.

#### findTestFiles(...patterns)

Use glob patterns to find test files to run.

#### loadTests

Read and load tests.

#### runTests

Run tests.

#### printResultsToConsole

Print result object to console.

#### randomizeTestOrder

Randomized the order tests are run.

#### writeResultsToJunitFile(filePath)

Write results to junit xml file.

### writeResultsToFile(filePath)

Write result object as json to file.

### component(key, value)

Register component to be passed to test functions.

### compose(...middlewears)

Compose multiple middlewear together as a new middlewear.

### event(type, callback)

Callback on event type

#### Event Types

- test:start
- test:result
- test:failure

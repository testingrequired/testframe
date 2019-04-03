# @testingrequired/tf

## Getting Started

### Example Project

See: https://github.com/testingrequired/tf-example

### Install

This can either be installed as a project dev dependency (recommended):

```bash
$ npm install --only=dev @testingrequired/tf
```

Or globally:

```bash
$ npm install -g @testingrequired/tf
```

### Use As Is

#### Script

```json
{
  "scripts": {
    "test": "tf"
  }
}
```

#### Write A Test

```javascript
/**
 * ./tests/example.test.js
 */

let value;

beforeEach(() => {
  value = 10;
});

test(`example test`, ({ assert }) => assert.equal(value, 10));
```

### Run

```bash
$ npm test
```

### Customize Framework

Use middlewear to customize the framework to your needs:

```javascript
/**
 * ./my-tf-cli.js
 */
import assert from "assert";

import tf, {
  component,
  findTestFiles,
  loadTests,
  runTests,
  writeResultsToJunitFile
} from "@testingrequired/tf";

import customSetupMiddlewear from "@example/custom-setup-middlewear";
import customResultsMiddlewear from "@example/custom-results-middlewear";

export default tf(
  customMiddlewear,
  component("assert", assert),
  findTestFiles("./tests/*.spec.js"),
  loadTests,
  runTests,
  writeResultsToJunitFile("./custom/path/to/junit.xml"),
  customResultsMiddlewear({
    option: "value"
  })
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

### findTestFiles(...patterns)

Use glob patterns to find test files to run.

### loadTests

Read and load tests.

### runTests

Run tests.

### printResultsToConsole

Print result object to console.

### writeResultsToFile(filePath)

Write result object as json to file.

### writeResultsToJunitFile(filePath)

Write results to junit xml file.

### component(key, value)

Register component to be passed to test functions.

### compose(...middlewears)

Compose multiple middlewear together as a new middlewear.

### randomizeTestOrder

Randomized the order tests are run.

### defaults

Returns a default set of middlewear.

### event(type, callback)

Callback on event type

#### Event Types

- test:start
- test:result
- test:failure

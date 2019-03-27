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

### Customize

Use middlewear to customize a tf instance to your needs:

```javascript
/**
 * ./my-tf-cli.js
 */
import assert from "assert";

import tf, {
  findTestFiles,
  component,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  writeResultsToJunitFile
} from "@testingrequired/tf";

export default tf(
  component("assert", assert),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToJunitFile("results.xml"),
  writeResultsToFile("results.json")
);
```

### Script

Wire them together using an npm script

```json
{
  "scripts": {
    "test": "tf ./my-tf-cli.js"
  }
}
```

### Write A Test

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

### defaults

Returns a default set of middlewear.

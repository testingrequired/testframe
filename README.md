# @testingrequired/tf

## Getting Started

### Install

```bash
$ npm install --only=dev @testingrequired/tf
```

### Create CLI

```javascript
/**
 * ./my-tf-cli.js
 */
const assert = require("assert");

import tf, {
  findTestFiles,
  component,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  writeResultsToJunitFile
} from "@testingrequired/tf";

export const run = tf(
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

```json
{
  "scripts": {
    "test": "tf ./my-tf-cli.js"
  }
}
```

### Write Tests

```javascript
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

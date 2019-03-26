# @testingrequired/tf

## Getting Started

### Install

```bash
$ npm install --only=dev @testingrequired/tf
```

### Customize

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
} from "@testingrequired.com";

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

```json
{
  "scripts": {
    "test": "tf ./my-tf-cli.js"
  }
}
```

### Write Tests

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

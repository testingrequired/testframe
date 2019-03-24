# @testingrequired/tf

## Usage

```javascript
import tf from "@testingrequired/tf";

const {
  findTestFiles,
  runTests,
  printResultsToConsole,
  writeResultsToFile
} = tf.middlewear;

const run = tf(
  findTestFiles("./tests/*.test.js", "./tests/*.spec.js"),
  runTests,
  printResultsToConsole,
  writeResultsToFile("results.json")
);

run();
```

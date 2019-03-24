# @testingrequired/tf

## Usage

```javascript
import path from "path";
import tf from "@testingrequired/tf";

const {
  findTestFiles,
  runTests,
  printResultsToConsole,
  writeResultsToFile
} = tf.middlewear;

const run = tf(
  findTestFiles("./tests/*.test.js"),
  runTests,
  printResultsToConsole,
  writeResultsToFile(path.join(process.cwd(), "results.json"))
);

run();
```

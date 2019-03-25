# @testingrequired/tf

## Usage

```javascript
import assert from "assert";
import tf, {
  findTestFiles,
  component,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  writeResultsToJunitFile,
  failureExitCode
} from "@testingrequired/tf";

const run = tf(
  component("assert", assert),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  printResultsToConsole,
  failureExitCode(),
  writeResultsToJunitFile("results.xml"),
  writeResultsToFile("results.json")
);

run();
```

# Anatomy

This document explains the basic logic and domain language. It uses typescript interfaces to illustrate.

## Framework File

A node executable javascript file where you define how the framework is configured/behaves.

```javascript
import { run, pipeline, middlewear } from "@testingrequired/tf";

const { starter, specSyntax, matchTestFiles, random, mock } = middlewear;

run(pipeline(starter, matchTestFiles("./tests/**/*.test.js"), specSyntax));
```

## Pipeline

Pipelines run middlewear to define test execution environments. This includes configuring `setup` and reporting `results`. Each pipeline has it's own `setup` and `results`.

## Setup

The `Setup` object contains all data needed to get the tests in a runnable state. The `testFilePaths` array are a list of all test files to be processed. The `globals` object are global variables exposed inside of test functions. The `args` object contains parsed CLI variables. The `tests` array contains all loaded tests.

```typescript
interface Setup {
  testFilePaths: Array<string>;
  globals: { [key: string]: any };
  args: { [key: string]: any };
  tests: Array<Test>;
}
```

## Test

All tests are loaded in to this common format.

```typescript
interface Test {
  testFilePath: string;
  description: string;
  fn: () => void;
  runState: "run" | "skip";
}
```

The `testFilePath` is the path to the test file relative to `process.cwd`.

The `description` is a text representation of the test.

The `fn` has the test and all required before/after functions included.

The `runState` determines if the test will run.

## Result

The `Result` object contains the results from a `Test`. There will always be a result for each test.

```typescript
interface Result {
  testFilePath: string;
  description: string;
  state: ResultStates;
  error?: Error;
  start: Date;
  end: Date;
  time: number;
}
```

## Middlewear

Middlewear is central to defining framework behavior. It's a curried function that executes in two phases: `setup` & `results`.

```typescript
interface SetupExecutor {
  (setup: Setup, events?: EventEmitter): void | ResultsExecutor;
}

interface ResultsExecutor {
  (results: Results): void;
}

type Middlewear = SetupExecutor;
```

### Example

```typescript
const middlewear = (setup: Setup) => {
  console.log("Runs during setup");
  return (results: Results) => {
    console.log("Runs during results");
  };
};
```

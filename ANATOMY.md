# Anatomy

This document explains the basic logic and domain language. It uses typescript interfaces to illustrate.

## Test

All tests are loaded in to this common format. The `testFilePath` is the path to the test file relative to `process.cwd`. The `description` is a text representation of the test. The `fn` has the test and all required before/after functions included. The `runState` determines if the test will run.

```typescript
interface Test {
  testFilePath: string;
  description: string;
  fn: () => void;
  runState: "run" | "skip";
}
```

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

## Result

The `Result` object contains the results from a `Test`. There will always be a result for each test.

```typescript
interface Result {
  testFilePath?: string;
  description?: string;
  state?: ResultStates;
  error?: Error;
  start?: Date;
  end?: Date;
}
```

## Middlewear

Middlewear is a curried function where the first function is the setup phase and an optional second function is the results phase.

```typescript
interface SetupExecutor {
  (setup: Setup, events?: EventEmitter): void | ResultsExecutor;
}

interface ResultsExecutor {
  (results: Results): void;
}

type Middlewear = SetupExecutor;
```

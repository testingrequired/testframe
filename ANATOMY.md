# 🧬 Anatomy

This document explains the basic logic and domain language. It uses typescript interfaces to illustrate.

## Executable

A node executable file where you define how the framework is configured/behaves.

```javascript
import { run, config, middleware } from "@testingrequired/testframe";

const { starter, matchTestFiles, specSyntax } = middleware;

run(config(starter, matchTestFiles("./tests/**/*.test.js"), specSyntax));
```

### Run

The run function can run multiple configs allowing you to configure a number of different type of tests.

### Config

A config is a collection of middleware that represents a set of tests: unit tests, end to end tests, api tests. The middleware used will define how tests are found, executed and reported.

## Middleware

Middleware is a two stage curried function: [`setup`](#setup) then an optional [`results`](#results).

```typescript
type SetupExecutorReturn = void | ResultsExecutor;

interface SetupExecutor {
  (setup: Setup): Promise<SetupExecutorReturn> | SetupExecutorReturn;
}

interface ResultsExecutor {
  (results: Array<Result>): void | Promise<void>;
}

type Middleware = SetupExecutor;
```

### Example Implementation

This demonstrates how execution works:

```typescript
const middleware = (setup: Setup) => {
  console.log("Runs during setup");
  return (results: Results) => {
    console.log("Runs during results");
  };
};
```

You can also return nothing as results is optional:

```typescript
const middleware = (setup: Setup) => {
  console.log("Runs during setup");
};
```

An event emitter is also passed in during the setup stage:

```typescript
const middleware = (setup: Setup) => {
  console.log("Runs during setup");

  setup.events.on("someEvent", () => console.log("Runs on event"));
};
```

### Async Implementation

Both the setup and result executors can optionally be async.

```typescript
const middleware = async (setup: Setup) => {
  console.log("Runs during setup");
  return (results: Results) => {
    console.log("Runs during results");
  };
};
```

```typescript
const middleware = (setup: Setup) => {
  console.log("Runs during setup");
  return async (results: Results) => {
    console.log("Runs during results");
  };
};
```

```typescript
const middleware = async (setup: Setup) => {
  console.log("Runs during setup");
  return async (results: Results) => {
    console.log("Runs during results");
  };
};
```

## Setup

The `Setup` object contains all data needed to get the tests in a runnable state. The `testFilePaths` array are a list of all test files to be processed. The `globals` object are global variables exposed inside of test functions. The `args` object contains parsed CLI variables. The `tests` array contains all loaded tests.

```typescript
interface Setup {
  events: EventEmitter;
  testFilePaths: Array<string>;
  globals: Record<string, any>;
  args: { [key: string]: any };
  tests: Array<Test>;
  assertionErrorsTypes: Array<Constructor<Error>>;
}
```

### Assertion Error Types

The `assertionErrorsTypes` property is an array of constructors that extend `Error`. When the test is ran an error throw that aren't listed here are treated as an error not a failure.

## Test

All tests are loaded in to this common format regardless of test syntax.

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

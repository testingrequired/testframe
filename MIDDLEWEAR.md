# Middlewear

Middlewear are the building blocks for functionality within the framework.

## Core

The framework comes with a number of core middlewears

### defaults

Includes several

```javascript
tf(defaults);
```

#### Included Middlewear

- [args](#args)
- [globals](#globalskey-value)(`"assert"`, `assert`)
- [randomize](#randomize)
- [reporter](#reporter)
- [runner](#runner)
- [exitOnFailedTests](#exitonfailedtests)
- [junit](#junitfilepath)(`"junit.xml"`)

### args

Uses `yargs` to parse `process.argv` accessible on `setup.args`

### args.withConfig(options)

#### Options

The `options` argument is passed to `yargs.config`

### matchTestFiles(...patterns)

Use glob patterns to find test files to run.

```javascript
tf(matchTestFiles("tests/**/*.test.js", "src/**/*.test.js"));
```

### assert

Loads node's assert as a global variable inside of tests.

### specSyntax

Load tests using the spec syntax: `describe`, `beforeEach`, `afterEach`, `it`

```javascript
tf(specSyntax);
```

```javascript
describe("counting", () => {
  let value = 0;

  describe("increment", () => {
    beforeEach(() => {
      value++;
    });

    it("should increase in value", () => {
      assert(value === 1);
    });
  });

  describe("decrement", () => {
    beforeEach(() => {
      value--;
    });

    it("should increase in value", () => {
      assert(value === -1);
    });
  });
});
```

### suiteSyntax

Load tests using the test suite syntax: `beforeEach`, `afterEach`, `test`

```javascript
tf(suiteSyntax);
```

```javascript
let value = 0;

beforeEach(() => {
  value++;
});

test(`should have incremented`, () => assert(value == 1));
```

### runner

Run tests.

```javascript
tf(runner);
```

### exitOnFailedTests

Exit with code of 1 on any failed result.

```javascript
tf(exitOnFailedTests);
```

### reporter

Print result object to console.

```javascript
tf(reporter);
```

### randomize

Randomized the order tests are run.

```javascript
tf(randomize);
```

### junit(filePath)

Write results to junit file.

```javascript
tf(junit("junit.xml"));
```

### globals(key, value)

Register global variable available inside tests.

```javascript
import assert from "assert";

const assertGlobal = globals("assert", assert);

tf(assertGlobal);
```

### compose(...middlewears)

Compose multiple middlewear together as a new middlewear.

```javascript
const events = compose(
  event("test:start", test => {}),
  event("test:result", result => {})
);

tf(events);
```

### event(type, callback)

Callback on event type

```javascript
tf(event("test:result", result => {}));
```

#### callback

```typescript
(payload: any) => void
```

#### Event Types

- test:start
- test:result
- test:failure

### random

Provides a `random` global test variable which provides a [chance](https://chancejs.com) instance.

```javascript
tf(random);
```

Used in test:

```javascript
test("should get random value", () => {
  console.log(random.string());
});
```

#### args

The `--seed` arg will be passed to chance.

## Anatomy

### Test

All tests are loaded in to this common format. The `testFilePath` is the path to the test file relative to `process.cwd`. The `description` is a text representation of the test. The `fn` has the test and all required before/after functions included. The `runState` determines if the test will run.

```typescript
interface Test {
  testFilePath: string;
  description: string;
  fn: () => void;
  runState: "run" | "skip";
}
```

### Setup

The `Setup` object contains all data needed to get the tests in a runnable state. The `testFilePaths` array are a list of all test files to be processed. The `globals` object are global variables exposed inside of test functions. The `args` object contains parsed CLI variables. The `tests` array contains all loaded tests.

```typescript
interface Setup {
  testFilePaths: Array<string>;
  globals: { [key: string]: any };
  args: { [key: string]: any };
  tests: Array<Test>;
}
```

### Result

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

### Middlewear

Middlewear is a curried function where the first function is the setup phase and an optional second function is the results phase.

```typescript
type SetupExecutor = (
  setup: Setup,
  events?: EventEmitter
) => void | ResultsExecutor;

type ResultsExecutor = (results: Results) => void;

type Middlewear = SetupExecutor;
```

# 🧩 Middleware

Middleware are the building blocks for functionality within the framework.

## Index

### Setup

- [args](#-args)
- [assert](#-assert)
- [exitOnNoTests](#-exitonnotests)
- [globals](#-globalskey-value)
- [log](#-log)
- [matchTestFiles](#-matchtestfilespatterns)
- [mock](#-mock)
- [multiassert](#-multiassert)
- [random](#-random)
- [randomize](#-randomize)
- [setupReporter](#-setupreporter)
- [specSyntax](#-specsyntax)
- [suiteSyntax](#-suitesyntax)

### Results

- [exitOnErroredTests](#-exitonerroredtests)
- [exitOnFailedTests](#-exitonfailedtests)
- [junit](#-junitfilepath)
- [resultsReporter](#-resultsreporter)
- [runner](#-runner)

### Utility

- [compose](#-composemiddlewares)
- [event](#-eventtype-callback)
- [starter](#-starter)

## 📚 starter

Includes several recommended middleware to get you started:

- [args](#-args)
- [assert](#-assert)
- [exitOnErroredTests](#-exitOnErroredTests)
- [exitOnFailedTests](#-exitonfailedtests)
- [log](#-log)
- [randomize](#-randomize)
- [resultsReporter](#-resultsReporter)
- [runner](#-runner)
- [setupReporter](#-setupReporter)

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.starter);
```

## ✔ args

Parse command line arguments to `setup.args`.

Uses [`yargs`](https://yargs.js.org/).

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.args);

// Middleware
function setupMiddleware(setup: Setup) {
  setup.args; // Contains parsed command line arguments
}
```

## ✔ args.withConfig(options)

Parse command line arugments using `yargs` options.

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.args.withOptions({}));

// Middleware
function setupMiddleware(setup: Setup) {
  setup.args; // Contains parsed command line arguments
}
```

## ✔ assert

Loads node's `assert` as a global test variable.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.assert);

// Test
assert.strictEquals(1, 1);
```

## ✔ matchTestFiles(...patterns)

Use glob patterns to find test files to run.

```javascript
// Executable
config(matchTestFiles("tests/**/*.test.js", "src/**/*.test.js"));
```

## ✔ specSyntax

Load tests using the spec syntax: `describe`, `beforeEach`, `afterEach`, `it`

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.specSyntax);

// Test
describe("counting", () => {
  let value;

  beforeEach(() => {
    value = 0;
  });

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

### Aliases

- `with`, `context` alias `describe`
- `test` aliases `it`

### Skipping

The following: `describe.skip`/`with.skip`/`context.skip`, `test.skip`/`it.skip` will skip tests are their respective levels.

## ✔ suiteSyntax

Load tests using the test suite syntax: `beforeEach`, `afterEach`, `test`

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.suiteSyntax);

// Test
let value = 0;

beforeEach(() => {
  value++;
});

test(`should have incremented`, () => assert(value == 1));
```

### Skipping

`test.skip`/`it.skip` will skip tests.

## ✔ runner

Run `setup.tests` and record results.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.runner);
```

## ✔ exitOnErroredTests

Exit with code of `2` on any `errored` result.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.exitOnErroredTests);
```

## ✔ exitOnFailedTests

Exit with code of `1` on any `failed` result.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.exitOnFailedTests);
```

## ✔ exitOnNoTests

Exit with code of `1` when setup finishes with no tests defined.

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.exitOnNoTests);
```

## ✔ setupReporter

Basic report of setup to console.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.setupReporter);
```

## ✔ resultsReporter

Basic report of results to console.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.resultsReporter);
```

## ✔ randomize

Randomized the order tests are run.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.randomize);
```

## ✔ log

Captures `console` logging and displays it in results. Useful for debugging.

Included in: 📚 starter

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.log);

// Test
console.log("Message", { some: "value" });

// Results
Logs:

"Message" {"some": "value"}
```

## ✔ junit(filePath)

Write results to junit file.

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.junit("junit.xml"));
```

## ✔ globals(key, value)

Register global variable available inside tests.

```javascript
// Middleware
import assert from "assert";
const assertGlobal = globals("assert", assert);

// Executable
config(assertGlobal);
```

## ✔ compose(...middlewares)

Compose multiple middleware together as a new middleware.

```javascript
// Middleware
const events = compose(
  event("test:start", test => {}),
  event("test:result", result => {})
);

// Executable
import events from "./path/to/eventsMiddleware";
config(events);
```

## ✔ event(type, callback)

Callback on event type

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.event("test:result", result => {}));
```

### callback

```typescript
(payload: any) => void
```

### Event Types

#### setup

Emitted when all setup middleware has completed. Payload is [setup](ANATOMY.md#setup) object.

#### results

Emitted when all results middleware has completed. Payload is [result](ANATOMY.md#result) array.

#### test:start

Emitted when test has started to execute.

#### test:result

Emitted when test has completed. Payload is [result](ANATOMY.md#result) object.

#### test:failure

Emitted when test has failed. Payload is [result](ANATOMY.md#result) object.

#### test:error

Emitted when test has errored. Payload is [result](ANATOMY.md#result) object.

## ✔ random

Provides a `random` global test variable which provides a [chance](https://chancejs.com) instance.

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.random);

// Test
test("should get random value", () => {
  console.log(random.string());
});
```

### args

The `--seed` arg will be passed to chance.

## ✔ mock

Provides a `mock` (an instance of [testdouble](https://github.com/testdouble/testdouble.js/)), `when`, `verify` and `replace` global test variables.

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.mock);

// Test
describe("mock", () => {
  it("should work with when and verify", () => {
    const mockFn = mock.func();
    const expectedInput = Symbol();
    const expectedOutput = Symbol();

    when(mockFn(expectedInput)).thenReturn(expectedOutput);

    function testFn() {
      return mockFn(expectedInput);
    }

    assert.strictEqual(testFn(), expectedOutput);
    verify(mockFn(expectedInput));
  });
});
```

## ✔ multiassert

Provides a `multiassert` global test variable which is an alias to [@testingrequired/multiassert](https://github.com/testingrequired/multiassert).

```javascript
// Executable
import { middleware } from "@testingrequired/tf";
config(middleware.multiassert);

// Test
test("should get mock function", () => {
  const point = {
    x: 1
  };

  try {
    multiassert(
      multiassert.assert(point.x, "x not defined"),
      multiassert.assert(point.y, "y not defined"),
      multiassert.assert(point.z, "z not defined")
    );
  } catch (e) {
    e.message === "AssertionError: y undefined,AssertionError: z undefined";
    e.errors[0].message === "AssertionError: y undefined";
    e.errors[1].message === "AssertionError: z undefined";
    throw e;
  }
});
```
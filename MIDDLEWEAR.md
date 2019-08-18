# Middlewear

Middlewear are the building blocks for functionality within the framework.

## ✔ defaults

Includes several recommended middlewear to get you started:

- [args](#-args)
- [assert](#-assert)
- [randomize](#-randomize)
- [setupReporter](#-setupReporter)
- [resultsReporter](#-resultsReporter)
- [runner](#-runner)
- [exitOnFailedTests](#-exitonfailedtests)
- [junit](#-junitfilepath)(`"junit.xml"`)
- [log](#-log)

```javascript
pipeline(defaults);
```

## ✔ args

Parse command line arguments to `setup.args`.

Uses [`yargs`](https://yargs.js.org/).

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.args);

// Middlewear
function setupMiddlewear(setup: Setup) {
  setup.args; // Contains parsed command line arguments
}
```

## ✔ args.withConfig(options)

Parse command line arugments using `yargs` options.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.args.withOptions({}));

// Middlewear
function setupMiddlewear(setup: Setup) {
  setup.args; // Contains parsed command line arguments
}
```

## ✔ assert

Loads node's `assert` as a global test variable.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.assert);

// Test
assert.strictEquals(1, 1);
```

## ✔ matchTestFiles(...patterns)

Use glob patterns to find test files to run.

```javascript
// Framework
pipeline(matchTestFiles("tests/**/*.test.js", "src/**/*.test.js"));
```

## ✔ specSyntax

Load tests using the spec syntax: `describe`, `beforeEach`, `afterEach`, `it`

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.specSyntax);

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
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.suiteSyntax);

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

Run pipeline `setup.tests` and report results to the pipeline's `results`

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.runner);
```

## ✔ exitOnFailedTests

Exit with code of 1 on any failed result.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.exitOnFailedTests);
```

## ✔ setupReporter

Basic report of setup to console.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.setupReporter);
```

## ✔ resultsReporter

Basic report of results to console.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.resultsReporter);
```

## ✔ randomize

Randomized the order tests are run.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.randomize);
```

## ✔ log

Add logger that outputs in test results. Useful for debugging.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.log);

// Test
log("Message", { some: "value" });

// Results
Logs:

"Message" {"some": "value"}
```

## ✔ junit(filePath)

Write results to junit file.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.junit("junit.xml"));
```

## ✔ globals(key, value)

Register global variable available inside tests.

```javascript
// Middlewear
import assert from "assert";
const assertGlobal = globals("assert", assert);

// Framework
pipeline(assertGlobal);
```

## ✔ compose(...middlewears)

Compose multiple middlewear together as a new middlewear.

```javascript
// Middlewear
const events = compose(
  event("test:start", test => {}),
  event("test:result", result => {})
);

// Framework
import events from "./path/to/eventsMiddlewear";
pipeline(events);
```

## ✔ event(type, callback)

Callback on event type

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.event("test:result", result => {}));
```

### callback

```typescript
(payload: any) => void
```

### Event Types

#### setup

Emitted when all setup middlewear has completed. Payload is setup object.

#### result

Emitted when all results middlewear has completed. Payload is results array.

#### test:start

Emitted when test has started to execute.

#### test:result

Emitted when test has completed. Payload is result object.

#### test:failure

Emitted when test has failed. Payload is result object.

#### test:error

Emitted when test has errored. Payload is result object.

## ✔ random

Provides a `random` global test variable which provides a [chance](https://chancejs.com) instance.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.random);

// Test
test("should get random value", () => {
  console.log(random.string());
});
```

### args

The `--seed` arg will be passed to chance.

## ✔ mock

Provides a `mock` global test variable which is a [testdouble](https://github.com/testdouble/testdouble.js/) instance.

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.mock);

// Test
test("should get mock function", () => {
  const mockFunction = mock.func();

  mockFunction("foo");
});
```

## ✔ multiassert

Provides a `multiassert` global test variable which is an alias to [@testingrequired/multiassert](https://github.com/testingrequired/multiassert).

```javascript
// Framework
import { middlewear } from "@testingrequired/tf";
pipeline(middlewear.multiassert);

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

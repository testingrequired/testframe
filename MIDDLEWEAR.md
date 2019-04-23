# @testingrequired/tf

## Customization

While `tf` offers reasonable [defaults](#defaults) you can use/write [middlewear](#middlewear) to tailor to any testing style.

```javascript
// ./custom-tf.js
import tf, { defaults } from "@testingrequired/tf";

export default tf(
  defaults.withOptions({testFilePatterns: ["./custom/path/*.spec.js"]}),
  specSyntax,
);
```

### Wire Test Command

The custom cli file is passed as the first argument.

```json
{
  "scripts": {
    "test": "tf custom ./custom-tf.js"
  }
}
```

## Middlewear

Nearly all functionality is provided through middlewear. Middlewear is n curried function defining `setup` and `results` stages respectively.

```typescript
type SetupExecutor = (
  setup: Setup,
  events?: EventEmitter
) => void | ResultsExecutor;

type ResultsExecutor = (results: Results) => void;

type Middlewear = SetupExecutor;
```

### defaults

Returns a default set of middlewear.

```javascript
tf(defaults);
```

#### Included Middlewear

- args
- assert,
- randomize
- reporter
- runner
- exitOnFailedTests
- junit(`junitFilePath`)

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

    it('should increase in value', () => {
      assert(value === 1);
    });
  });

  describe("decrement", () => {
    beforeEach(() => {
      value--;
    });

    it('should increase in value', () => {
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

## Writing Middlewear

Middlewear is written as a curried function:

```typescript
type SetupExecutor = (
  setup: Setup,
  events?: EventEmitter
) => void | ResultsExecutor;

type ResultsExecutor = (results: Results) => void;

type Middlewear = SetupExecutor;
```

The first function `SetupExecutor` configures `setup` and `events` while the second function `ResultsExecutor` modifies `results`.

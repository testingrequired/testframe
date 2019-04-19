# @testingrequired/tf

Build your own test framework.

## Features

- 🗂 Built on middlewear & composition
- 🔋 Most batteries included

## Design Goals

- Easy to understand
- Testing style agnostic
- Extendable

## Getting Started

### Install

```bash
$ npm i -D @testingrequired/tf@latest
```

or

```bash
$ yarn add -D @testingrequired/tf@latest
```

### Add Test Script

```javascript
// package.json

{
  ...package,
  "scripts": {
    "test": "tf"
  }
}
```

### Write Some Tests

```javascript
// tests/example.test.js

let value;

beforeEach(() => {
  value = 10;
});

test(`example test`, () => assert.equal(value, 10));
```

### Run Those Tests

```bash
$ npm test
```

## Customize Framework

Use [middlewear](#middlewear) to customize the framework to your needs:

```javascript
// custom-tf.js
import tf, { defaults, event } from "@testingrequired/tf";

export default tf(
  defaults(),
  event("test:failure", result => {
    console.log(`${result.description} failed`);
  })
);
```

### Test Script

```json
{
  "scripts": {
    "test": "tf ./custom-tf.js"
  }
}
```

### Run Tests

```bash
$ npm test
```

## Middlewear

### defaults(options)

Returns a default set of middlewear.

```javascript
tf(defaults());
```

#### Options

- testFilePatterns: `Array<string>`
- junitFilePath: `string`

#### Included Middlewear

- args
- assert,
- matchTestFiles(`...testFilePatterns`)
- specSyntax
- randomize
- reporter
- runner
- failureExitCode()
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

### runner

Run tests.

```javascript
tf(runner);
```

### failureExitCode(exitCode = 1)

Exit with code on failure

```javascript
tf(failureExitCode());
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

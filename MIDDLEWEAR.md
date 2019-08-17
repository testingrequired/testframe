# Middlewear

Middlewear are the building blocks for functionality within the framework.

## Core

The framework comes with a number of core middlewears

### defaults

Includes several

```javascript
pipeline(defaults);
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
pipeline(matchTestFiles("tests/**/*.test.js", "src/**/*.test.js"));
```

### assert

Loads node's assert as a global variable inside of tests.

### specSyntax

Load tests using the spec syntax: `describe`, `beforeEach`, `afterEach`, `aroundEach`, `it`

```javascript
pipeline(specSyntax);
```

```javascript
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

#### Aliases

- `with`, `context` alias `describe`
- `test` aliases `it`
- `setup` aliases `aroundEach`

#### Skipping

The following: `describe.skip`/`with.skip`/`context.skip`, `test.skip`/`it.skip` will skip tests are their respective levels.

#### aroundEach

```javascript
describe("something", () => {
  let someMock;
  let anotherMock;

  aroundEach(function*() {
    someMock = mock.func();
    anotherMock = mock.func();
    yield;
    mock.reset();
  });

  it("should work", () => {
    something(someMock, anotherMock);
    expect(someMock).to.have.been.called;
    expect(anotherMock).to.have.been.called;
  });
});
```

### suiteSyntax

Load tests using the test suite syntax: `beforeEach`, `afterEach`, `test`

```javascript
pipeline(suiteSyntax);
```

```javascript
let value = 0;

beforeEach(() => {
  value++;
});

test(`should have incremented`, () => assert(value == 1));
```

#### Skipping

`test.skip`/`it.skip` will skip tests.

### runner

Run tests.

```javascript
pipeline(runner);
```

### exitOnFailedTests

Exit with code of 1 on any failed result.

```javascript
pipeline(exitOnFailedTests);
```

### reporter

Report progress and results to console.

```javascript
pipeline(reporter);
```

### randomize

Randomized the order tests are run.

```javascript
pipeline(randomize);
```

### junit(filePath)

Write results to junit file.

```javascript
pipeline(junit("junit.xml"));
```

### globals(key, value)

Register global variable available inside tests.

```javascript
import assert from "assert";

const assertGlobal = globals("assert", assert);

pipeline(assertGlobal);
```

### compose(...middlewears)

Compose multiple middlewear together as a new middlewear.

```javascript
const events = compose(
  event("test:start", test => {}),
  event("test:result", result => {})
);

pipeline(events);
```

### event(type, callback)

Callback on event type

```javascript
pipeline(event("test:result", result => {}));
```

#### callback

```typescript
(payload: any) => void
```

#### Event Types

##### setup

Emitted when all setup middlewear has completed. Payload is setup object.

##### result

Emitted when all results middlewear has completed. Payload is results array.

##### test:start

Emitted when test has started to execute.

##### test:result

Emitted when test has completed. Payload is result object.

##### test:failure

Emitted when test has failed. Payload is result object.

##### test:error

Emitted when test has errored. Payload is result object.

### random

Provides a `random` global test variable which provides a [chance](https://chancejs.com) instance.

```javascript
pipeline(random);
```

Used in test:

```javascript
test("should get random value", () => {
  console.log(random.string());
});
```

#### args

The `--seed` arg will be passed to chance.

### mock

Provides a `mock` global test variable which is a [testdouble](https://github.com/testdouble/testdouble.js/) instance.

```javascript
pipeline(mock);
```

Used in test:

```javascript
test("should get mock function", () => {
  const mockFunction = mock.func();

  mockFunction("foo");
});
```

### multiassert

Provides a `multiassert` global test variable which is an alias to [@testingrequired/multiassert](https://github.com/testingrequired/multiassert).

```javascript
pipeline(multiassert);
```

Used in test:

```javascript
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
  }
});
```

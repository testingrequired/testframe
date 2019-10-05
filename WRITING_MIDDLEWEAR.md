# Writing Middlewear

While there is a wide range of built in [middlewear](MIDDLEWEAR.md) it will be likely that custom behavior is required and you'll need to write middlewear to do that.

## Understanding

The framework's middlewear are [curried](https://en.wikipedia.org/wiki/Currying) functions. The first function handles setup: finding test files, loading tests, defining test globals, defining event handlers. The, optionally, returned function handles gathering and reporting results.

These middlewear are passed in a `config` function where they are ready to run to be run. The order of the middlewear doesn't matter in most situations. Middlewear that only work in the returned results function can be defined before ones that work in the setup function.

Cases where this does matter would be if your middlewear relied on defined globals from other middlewear or if a reporter was defined before the tests had ran. The setup function has an `EventEmitter` which can help mitigate this it's not fool proof.

## Executable

This is the executable we are starting with:

```javascript
import { run, config, middlewear } from "@testingrequired/tf";

const { starter, matchTestFiles, specSyntax } = middlewear;

run(config(starter, matchTestFiles("./tests/**/*.spec.js"), specSyntax));
```

## Basic Example

We are going to write middlewear that reports every time a test fails: `testFailedReporter.ts`

```typescript
import assert from "assert";
import globals from "./globals";
import Setup from "../types/Setup";

export default (setup: Setup) => (results: Array<Result>) => {
  results.forEach(result => {
    console.log(`${result.description} failed`);
  });
};
```

Import and add this custom middlewear to your config:

```javascript
import { run, config, middlewear } from "@testingrequired/tf";
import testFailedReporter from "./testFailedReporter";

const { starter, matchTestFiles, specSyntax } = middlewear;

run(
  config(
    starter,
    matchTestFiles("./tests/**/*.spec.js"),
    specSyntax,
    testFailedReporter
  )
);
```

Another way to write this would be to use the setup `EventEmitter`:

```typescript
import assert from "assert";
import globals from "./globals";
import Setup from "../types/Setup";

export default (setup: Setup, events?: EventEmitter) => {
  events.on("results", results => {
    results.forEach(result => {
      console.log(`${result.description} failed`);
    });
  });
};
```

The advantage here is that we no longer have to worry about results being populated as a dependency. This event will fire when it's ready.

```javascript
import { run, config, middlewear } from "@testingrequired/tf";
import testFailedReporter from "./testFailedReporter";

const { starter, matchTestFiles, specSyntax } = middlewear;

run(
  config(
    testFailedReporter,
    starter,
    matchTestFiles("./tests/**/*.spec.js"),
    specSyntax
  )
);
```

This would work just fine.
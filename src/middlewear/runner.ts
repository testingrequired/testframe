import Setup from "../types/Setup";
import Results from "../types/Results";
import Result from "../types/Result";
import { EventEmitter } from "events";
import { AssertionError } from "assert";

export default function runner(setup: Setup, events: EventEmitter) {
  return (results: Results) => {
    const { tests, globals } = setup;

    const globalReplacements = new Map();

    tests.forEach(test => {
      const { testFilePath, description, fn: testFn, runState } = test;

      events.emit("test:start", test);

      let result: Result = {};
      let start = new Date();

      result.testFilePath = testFilePath;
      result.description = description;

      switch (runState) {
        case "run":
          try {
            createGlobals(globals, globalReplacements);

            testFn.call(null);

            result.state = "passed";
          } catch (e) {
            mapErrorToResult(e, result);

            switch (result.state) {
              case "failed":
                events.emit("test:failure", result);
                break;
              case "errored":
                events.emit("test:error", result);
                break;
            }
          } finally {
            removeGlobals(globals, globalReplacements);
          }
          break;

        case "skip":
          result.state = "skipped";
          events.emit("test:skip", result);
          break;

        default:
          throw new Error(`Invalid test run state: ${runState}`);
      }

      result.start = start;
      result.end = new Date();

      events.emit("test:result", result);

      results.push(result);
    });
  };
}

function mapErrorToResult(e, result) {
  switch (true) {
    case e instanceof AssertionError:
      result.state = "failed";
      result.error = e;
      break;

    default:
      result.state = "errored";
      result.error = e;
      break;
  }
}

function createGlobals(globals, globalReplacements: Map<any, any>) {
  Object.entries(globals).forEach(i => {
    const [key, value] = i;

    if (global.hasOwnProperty(key)) {
      globalReplacements.set(key, global[key]);
    }

    global[key] = value;
  });
}

function removeGlobals(globals, globalReplacements: Map<any, any>) {
  Object.entries(globals).forEach(i => {
    const [key, value] = i;

    if (globalReplacements.has(key)) {
      global[key] = globalReplacements.get(key);
    } else {
      delete global[key];
    }
  });
}

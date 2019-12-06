import Setup from "../types/Setup";
import Results from "../types/Results";
import Result, { ResultStates } from "../types/Result";
import { EventEmitter } from "events";
import { AssertionError } from "assert";

export default function runner(setup: Setup, events: EventEmitter) {
  return (results: Results) => {
    const { tests, globals } = setup;

    const globalReplacements = new Map();

    tests.forEach(test => {
      const { testFilePath, description, fn: testFn, runState } = test;

      events.emit("test:start", test);

      const start = new Date();

      let state;
      let error: Error | undefined;

      switch (runState) {
        case "run":
          try {
            createGlobals(globals, globalReplacements);
            testFn.call(null);
            state = "passed";
          } catch (e) {
            state = mapErrorToState(e);
            error = e;
          } finally {
            removeGlobals(globals, globalReplacements);
          }
          break;

        case "skip":
          state = "skipped";
          break;

        default:
          throw new Error(`Invalid test run state: ${runState}`);
      }

      const result: Result = {
        state,
        start,
        error,
        end: new Date(),
        testFilePath,
        description,
        get time() {
          return this.end.getTime() - this.start.getTime();
        }
      };

      events.emit("test:result", result);

      switch (state) {
        case "failed":
          events.emit("test:failure", result);
          break;
        case "errored":
          events.emit("test:error", result);
          break;
        case "skipped":
          events.emit("test:skip", result);
          break;
      }

      results.push(result);
    });
  };
}

function mapErrorToState(error): ResultStates {
  return error instanceof AssertionError ? "failed" : "errored"

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

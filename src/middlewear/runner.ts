import Setup from "../types/Setup";
import Results from "../types/Results";
import Result from "../types/Result";
import { EventEmitter } from "events";
import { AssertionError } from "assert";

export default function runner(setup: Setup, events: EventEmitter) {
  return (results: Results) => {
    const { tests, globals } = setup;

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
            createGlobals(globals);

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
            removeGlobals(globals);
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

    events.emit("results", results);
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

function createGlobals(globals) {
  Object.entries(globals).forEach(i => {
    const [key, value] = i;

    (global as any)[key] = value;
  });
}

function removeGlobals(globals) {
  Object.entries(globals).forEach(i => {
    const [key, value] = i;

    (global as any)[key] = value;
  });
}

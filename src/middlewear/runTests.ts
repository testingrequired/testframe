import Setup from "../types/Setup";
import Results from "../types/Results";
import Result from "../types/Result";
import { EventEmitter } from "events";

export default function runTests(setup: Setup, events: EventEmitter) {
  return (results: Results) => {
    const { tests, components } = setup;

    tests.forEach(test => {
      const { testFilePath, description, fn, runState } = test;

      events.emit("test:start", test);

      let result: Result = {};
      let start = new Date();

      result.testFilePath = testFilePath;
      result.description = description;

      switch (runState) {
        case "run":
          try {
            fn(components);
            result.state = "passed";
          } catch (e) {
            result.state = "failed";
            result.error = e;
            events.emit("test:failure", result);
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

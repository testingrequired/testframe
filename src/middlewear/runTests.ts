import Setup from "../types/Setup";
import Results from "../types/Results";
import Result from "../types/Result";

export default function runTests(setup: Setup, results: Results) {
  const { tests, components } = setup;

  tests.forEach(({ testFilePath, description, fn, runState }) => {
    if (!results[testFilePath]) {
      results[testFilePath] = {};
    }

    let result: Result = {};
    let start = new Date();

    switch (runState) {
      case "run":
        try {
          fn(components);
          result.state = "passed";
        } catch (e) {
          result.state = "failed";
          result.error = e;
        }
        break;

      case "skip":
        result.state = "skipped";
        break;

      default:
        throw new Error(`Invalid test run state: ${runState}`);
    }

    result.start = start;
    result.end = new Date();
    results[testFilePath][description] = result;
  });
}

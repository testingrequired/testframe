import Setup from "../types/Setup";
import Results from "../types/Results";
import Result from "../types/Result";

export default function runTests(setup: Setup, results: Results) {
  const { tests, components } = setup;

  tests.forEach(({ testFilePath, description, fn }) => {
    if (!results[testFilePath]) {
      results[testFilePath] = {};
    }

    let result: Result = {};
    let start;

    try {
      start = new Date();
      fn(components);
      result.state = "passed";
    } catch (e) {
      result.state = "failed";
      result.error = e;
    } finally {
      result.start = start;
      result.end = new Date();
      results[testFilePath][description] = result;
    }
  });
}

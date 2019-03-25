import Setup from "../Setup";
import Results from "../Results";
import Result from "../Result";

export default function runTests(setup: Setup, results: Results) {
  const { tests, components } = setup;

  tests.forEach(
    ({ testFilePath, description, fn: test, beforeEachs, afterEachs }) => {
      if (!results[testFilePath]) {
        results[testFilePath] = {};
      }

      let result: Result = {};
      let start;

      try {
        beforeEachs.forEach(beforeEach => beforeEach());
        start = new Date();
        test(components);

        afterEachs.forEach(afterEach => afterEach());
        result.state = "passed";
      } catch (e) {
        result.state = "failed";
        result.error = e;
      } finally {
        result.start = start;
        result.end = new Date();
        results[testFilePath][description] = result;
      }
    }
  );
}

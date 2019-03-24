import assert from "assert";

import Setup from "../Setup";
import Results from "../Results";
import Result from "../Result";

export default function runTests(setup: Setup, results: Results) {
  const {
    tests,
    components,
    beforeAlls,
    beforeEachs,
    afterEachs,
    afterAlls
  } = setup;

  beforeAlls.forEach(beforeAll => beforeAll());

  tests.forEach(([testFilePath, description, test]) => {
    let result: Result = {};
    let start;

    try {
      beforeEachs.forEach(beforeEach => beforeEach());
      start = new Date();
      test(assert, components);

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
  });

  afterAlls.forEach(afterAll => afterAll());
}

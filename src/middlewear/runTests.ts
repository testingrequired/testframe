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

    try {
      beforeEachs.forEach(beforeEach => beforeEach());
      test(assert, components);
      afterEachs.forEach(afterEach => afterEach());
      result.state = "passed";
    } catch (e) {
      result.state = "failed";
      result.error = e;
    } finally {
      results[testFilePath][description] = result;
    }
  });

  afterAlls.forEach(afterAll => afterAll());
}

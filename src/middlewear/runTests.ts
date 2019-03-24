import assert from "assert";

import Setup from "../Setup";
import Results from "../Results";

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
    let result;

    try {
      beforeEachs.forEach(beforeEach => beforeEach());
      test(assert, components);
      afterEachs.forEach(afterEach => afterEach());
      result = true;
    } catch (e) {
      result = e;
    } finally {
      results[testFilePath][description] = result;
    }
  });

  afterAlls.forEach(afterAll => afterAll());
}

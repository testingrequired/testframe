import assert from "assert";
import Setup from "../Setup";
import Results from "../Results";

export default function runTests(setup: Setup, results: Results) {
  const { testFilePaths, components } = setup;

  testFilePaths.forEach(testFilePath => {
    results[testFilePath] = {};

    const beforeAlls = [];
    (global as any).beforeAll = fn => beforeAlls.push(fn);

    const beforeEachs = [];
    (global as any).beforeEach = fn => beforeEachs.push(fn);

    const afterEachs = [];
    (global as any).afterEach = fn => afterEachs.push(fn);

    const afterAlls = [];
    (global as any).afterAll = fn => afterAlls.push(fn);

    const tests = [];
    (global as any).test = (description: string, fn: () => void) =>
      tests.push([description, fn]);

    require(testFilePath);

    beforeAlls.forEach(beforeAll => beforeAll());

    tests.forEach(([description, test]) => {
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
  });
}

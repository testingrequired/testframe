import Setup from "../Setup";
import Results from "../Results";

export default function loadTests(setup: Setup, results: Results) {
  const {
    testFilePaths,
    beforeAlls,
    beforeEachs,
    afterEachs,
    afterAlls,
    tests,
    skips
  } = setup;

  testFilePaths.forEach(testFilePath => {
    results[testFilePath] = {};

    (global as any).beforeAll = fn => beforeAlls.push(fn);

    (global as any).beforeEach = fn => beforeEachs.push(fn);

    (global as any).afterEach = fn => afterEachs.push(fn);

    (global as any).afterAll = fn => afterAlls.push(fn);

    function test(description: string, fn: () => void) {
      tests.push([testFilePath, description, fn]);
    }

    (global as any).test = test;

    test.skip = (description: string, fn: () => void) => {
      skips.push([testFilePath, description, fn]);
    };

    require(testFilePath);
  });
}

import Setup from "../Setup";
import Results from "../Results";

export default function loadTests(setup: Setup, results: Results) {
  const {
    testFilePaths,
    beforeAlls,
    beforeEachs,
    afterEachs,
    afterAlls,
    tests
  } = setup;

  testFilePaths.forEach(testFilePath => {
    results[testFilePath] = {};

    (global as any).beforeAll = fn => beforeAlls.push(fn);

    (global as any).beforeEach = fn => beforeEachs.push(fn);

    (global as any).afterEach = fn => afterEachs.push(fn);

    (global as any).afterAll = fn => afterAlls.push(fn);

    (global as any).test = (description: string, fn: () => void) =>
      tests.push([testFilePath, description, fn]);

    require(testFilePath);
  });
}

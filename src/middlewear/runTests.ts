import Setup from "../Setup";
import Results from "../Results";

export default function runTests(setup: Setup, results: Results) {
  const { testFilePaths } = setup;

  testFilePaths.forEach(testFilePath => {
    results[testFilePath] = {};

    const beforeEachs = [];
    (global as any).beforeEach = fn => beforeEachs.push(fn);

    const tests = [];
    (global as any).test = (description: string, fn: () => void) =>
      tests.push([description, fn]);

    require(testFilePath);

    tests.forEach(([description, test]) => {
      let result;

      try {
        beforeEachs.forEach(beforeEach => beforeEach());
        test();
        result = true;
      } catch (e) {
        result = e;
      } finally {
        results[testFilePath][description] = result;
      }
    });
  });
}

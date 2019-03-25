import path from "path";
import Setup from "../Setup";

export default function loadTests(setup: Setup) {
  const { testFilePaths, tests, skips } = setup;

  testFilePaths.forEach(testFilePath => {
    const beforeEachs = [];
    (global as any).beforeEach = fn => beforeEachs.push(fn);

    const afterEachs = [];
    (global as any).afterEach = fn => afterEachs.push(fn);

    function test(description: string, fn: () => void) {
      tests.push({ testFilePath, description, fn, beforeEachs, afterEachs });
    }

    (global as any).test = test;

    test.skip = (description: string, fn: () => void) => {
      skips.push({
        testFilePath,
        description,
        fn,
        beforeEachs: [],
        afterEachs: []
      });
    };

    require(path.join(process.cwd(), testFilePath));
  });
}

import path from "path";
import Setup from "../types/Setup";
import TestFunction from "../types/TestFunction";
import Test from "../types/Test";

declare var global: any;

export default function specSyntax(setup: Setup) {
  setup.tests.push(...setup.testFilePaths.flatMap(loadTestFile));
}

/**
 * Load test from path
 *
 * @param testFilePath Path to test file
 */
function loadTestFile(testFilePath): Array<Test> {
  const tests = [];
  const descriptions = [];
  const beforeEachs = [];
  const afterEachs = [];

  /**
   * Global state to track which describe/test blocks are being skipped
   */
  let globalShouldSkipTest: boolean;

  function describe(description: string, fn: any) {
    descriptions.push(description);
    fn();
    descriptions.pop();
    beforeEachs.pop();
    afterEachs.pop();
  }

  global.describe = global.with = global.context = describe;

  describe.skip = (description: string, fn: any) => {
    globalShouldSkipTest = true;
    describe(description, fn);
    globalShouldSkipTest = false;
  };

  global.beforeEach = global.setup = fn => {
    beforeEachs.push(fn);
  };

  global.afterEach = global.teardown = fn => {
    afterEachs.push(fn);
  };

  function test(testDescription: string, testFn: TestFunction) {
    const describeDepth = descriptions.length;

    const wrappedTestFn: () => TestFunction = () => {
      if (globalShouldSkipTest) return () => {};

      const sliceEnd = describeDepth + 1;
      const testsBeforeEachs = beforeEachs.slice(0, sliceEnd);
      const testsAfterEachs = afterEachs.slice(0, sliceEnd);

      return () => {
        testsBeforeEachs.forEach(fn => fn.call(null));
        testFn();
        testsAfterEachs.forEach(fn => fn.call(null));
      };
    };

    tests.push({
      testFilePath,
      description: [...descriptions, testDescription].join(" "),
      fn: wrappedTestFn(),
      runState: globalShouldSkipTest ? "skip" : "run"
    });
  }

  global.test = global.it = test;

  test.skip = (description: string, fn: any) => {
    globalShouldSkipTest = true;
    test(description, fn);
    globalShouldSkipTest = false;
  };

  require(path.join(process.cwd(), testFilePath));

  delete global.describe;
  delete global.beforeEach;
  delete global.afterEach;
  delete global.test;

  return tests;
}

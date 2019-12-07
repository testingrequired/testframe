import path from "path";
import Setup from "../types/Setup";
import TestFunction from "../types/TestFunction";
import Test from "../types/Test";

declare var global: any;

export default function specSyntax(setup: Setup) {
  const tests = setup.testFilePaths.reduce<Array<Test>>(
    (tests, testFilePath) => [...tests, ...loadTestFile(testFilePath)],
    []
  );

  setup.tests.push(...tests);
}

/**
 * Load test from path
 *
 * @param testFilePath Path to test file
 */
function loadTestFile(testFilePath: string): Array<Test> {
  const tests: Array<Test> = [];
  const descriptions: Array<string> = [];
  const beforeEachs: Array<Function> = [];
  let beforeEachDelta = 0;
  const afterEachs: Array<Function> = [];
  let afterEachDelta = 0;

  /**
   * Global state to track which describe/test blocks are being skipped
   */
  let globalShouldSkipTest: boolean;

  function describe(description: string, fn: any) {
    descriptions.push(description);
    beforeEachDelta = 0;
    afterEachDelta = 0;
    fn();
    descriptions.pop();
    beforeEachs.splice(beforeEachDelta * -1, beforeEachDelta);
    beforeEachDelta = 0;
    afterEachs.splice(afterEachDelta * -1, afterEachDelta);
    afterEachDelta = 0;
  }

  global.describe = global.with = global.context = describe;

  describe.skip = (description: string, fn: any) => {
    globalShouldSkipTest = true;
    describe(description, fn);
    globalShouldSkipTest = false;
  };

  global.beforeEach = global.setup = (fn: () => void) => {
    beforeEachDelta++;
    beforeEachs.push(fn);
  };

  global.afterEach = global.teardown = (fn: () => void) => {
    afterEachDelta++;
    afterEachs.push(fn);
  };

  function test(testDescription: string, testFn: TestFunction) {
    const describeDepth = descriptions.length;

    const wrappedTestFn: () => TestFunction = () => {
      if (globalShouldSkipTest) return () => { };

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

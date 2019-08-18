import path from "path";
import Setup from "../types/Setup";
import callWith from "../utils/callWith";
import TestFunction from "../types/TestFunction";
import flat from "../utils/flat";
import Test from "../types/Test";

declare var global: any;

export default function specSyntax(setup: Setup) {
  const { testFilePaths, tests } = setup;

  const loadedTests: Array<Test> = flat(testFilePaths.map(loadTest));

  tests.push(...loadedTests);
}

/**
 * Load test from path
 *
 * @param testFilePath Path to test file
 */
function loadTest(testFilePath): Array<Test> {
  const tests = [];
  const descriptions = [];
  const beforeEachs = [[]];
  const afterEachs = [[]];
  const aroundEachs: Array<Array<GeneratorFunction>> = [[]];

  /**
   * Global state to track which describe/test blocks are being skipped
   */
  let globalShouldSkipTest: boolean;

  /**
   * describe
   */
  function describe(description: string, fn: any) {
    descriptions.push(description);
    fn();
    descriptions.pop();
  }
  global.describe = global.with = global.context = describe;
  describe.skip = (description: string, fn: any) => {
    globalShouldSkipTest = true;
    describe(description, fn);
    globalShouldSkipTest = false;
  };

  /**
   * beforeEach
   */
  global.beforeEach = global.setup = registerHookAtDescribeDepth(
    descriptions,
    beforeEachs
  );

  /**
   * afterEach
   */
  global.afterEach = global.teardown = registerHookAtDescribeDepth(
    descriptions,
    afterEachs
  );

  /**
   * aroundEach
   */
  global.aroundEach = registerHookAtDescribeDepth(descriptions, aroundEachs);

  /**
   * test
   */
  function test(testDescription: string, testFn: TestFunction) {
    const describeDepth = descriptions.length;

    const wrappedTestFn: () => TestFunction = () => {
      if (globalShouldSkipTest) return () => {};

      const sliceEnd = describeDepth + 1;
      const testsBeforeEachs = flat(beforeEachs.slice(0, sliceEnd));
      const testsAfterEachs = flat(afterEachs.slice(0, sliceEnd));
      const testAroundEachs: Array<GeneratorFunction> = flat(
        aroundEachs.slice(0, sliceEnd)
      );

      return () => {
        const testAroundEachIters = getAroundEachBeforeAfter(testAroundEachs);

        testsBeforeEachs.forEach(callWith());
        testAroundEachIters.forEach(([before, _]) => before());
        testFn();
        testAroundEachIters.forEach(([_, after]) => after());
        testsAfterEachs.forEach(callWith());
      };
    };

    const description = [...descriptions, testDescription].join(" ");

    const runState = globalShouldSkipTest ? "skip" : "run";

    const test: Test = {
      testFilePath,
      description,
      fn: wrappedTestFn(),
      runState
    };

    tests.push(test);
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

function getAroundEachBeforeAfter(testAroundEachs) {
  return testAroundEachs
    .map(callWith())
    .reduce(
      (acc, item) => [...acc, [() => item.next(), () => item.next()]],
      []
    );
}

function registerHookAtDescribeDepth(descriptions, hooks) {
  return fn => {
    const describeDepth = descriptions.length;
    if (hooks.length <= describeDepth) {
      hooks.push([]);
    }
    hooks[describeDepth].push(fn);
  };
}

import path from "path";
import Setup from "../types/Setup";
import callWith from "../utils/callWith";
import TestFunction from "../types/TestFunction";

export default function suiteSyntax(setup: Setup) {
  const { testFilePaths, tests } = setup;

  testFilePaths.forEach(testFilePath => {
    let globalShouldSkipTest;

    const beforeEachs = [];
    (global as any).beforeEach = fn => beforeEachs.push(fn);

    const afterEachs = [];
    (global as any).afterEach = fn => afterEachs.push(fn);

    function test(description: string, fn: TestFunction) {
      const wrapped: TestFunction = globalShouldSkipTest
        ? () => {}
        : () => {
            beforeEachs.map(callWith());
            fn();
            afterEachs.map(callWith());
          };

      tests.push({
        testFilePath,
        description,
        fn: wrapped,
        runState: globalShouldSkipTest ? "skip" : "run"
      });
    }

    (global as any).test = test;

    test.skip = (description: string, fn: TestFunction) => {
      globalShouldSkipTest = true;
      test(description, fn);
      globalShouldSkipTest = false;
    };

    require(path.join(process.cwd(), testFilePath));

    delete (global as any).beforeEach;
    delete (global as any).afterEach;
    delete (global as any).test;
  });
}

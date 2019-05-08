import path from "path";
import Setup from "../types/Setup";
import callWith from "../utils/callWith";
import TestFunction from "../types/TestFunction";
import flat from "../utils/flat";

export default function loadTests(setup: Setup) {
  const { testFilePaths, tests } = setup;

  testFilePaths.forEach(testFilePath => {
    const descriptions = [];
    let globalShouldSkipTest;

    function describe(description: string, fn: any) {
      descriptions.push(description);
      fn();
      descriptions.pop();
    }

    (global as any).describe = describe;

    (global as any).with = describe;

    (global as any).context = describe;

    describe.skip = (description: string, fn: any) => {
      globalShouldSkipTest = true;
      describe(description, fn);
      globalShouldSkipTest = false;
    };

    const beforeEachs = [[]];
    (global as any).beforeEach = fn => {
      const describeDepth = descriptions.length;
      if (beforeEachs.length <= describeDepth) beforeEachs.push([]);
      beforeEachs[describeDepth].push(fn);
    };

    const afterEachs = [[]];
    (global as any).afterEach = fn => {
      const describeDepth = descriptions.length;
      if (afterEachs.length <= describeDepth) afterEachs.push([]);
      afterEachs[describeDepth].push(fn);
    };

    const aroundEachs: Array<Array<GeneratorFunction>> = [[]];
    function aroundEach(gfn: GeneratorFunction) {
      const describeDepth = descriptions.length;
      if (aroundEachs.length <= describeDepth) aroundEachs.push([]);
      aroundEachs[describeDepth].push(gfn);
    }
    (global as any).aroundEach = aroundEach;
    (global as any).setup = aroundEach;

    function test(description: string, fn: TestFunction) {
      const describeDepth = descriptions.length;

      const wrapped: () => TestFunction = () => {
        const sliceEnd = describeDepth + 1;
        const testsBeforeEachs = flat(beforeEachs.slice(0, sliceEnd));
        const testsAfterEachs = flat(afterEachs.slice(0, sliceEnd));
        const testAroundEachs: Array<GeneratorFunction> = flat(
          aroundEachs.slice(0, sliceEnd)
        );

        return globalShouldSkipTest
          ? () => {}
          : () => {
              const testAroundEachIters = testAroundEachs.map(fn => fn());
              testsBeforeEachs.forEach(callWith());
              testAroundEachIters.forEach(testAroundEach =>
                testAroundEach.next()
              );
              fn();
              testAroundEachIters.forEach(testAroundEach =>
                testAroundEach.next()
              );
              testsAfterEachs.forEach(callWith());
            };
      };

      const testDescription = [...descriptions, description].join(" ");

      tests.push({
        testFilePath,
        description: testDescription,
        fn: wrapped(),
        runState: globalShouldSkipTest ? "skip" : "run"
      });
    }

    (global as any).test = test;

    (global as any).it = test;

    test.skip = (description: string, fn: TestFunction) => {
      globalShouldSkipTest = true;
      test(description, fn);
      globalShouldSkipTest = false;
    };

    require(path.join(process.cwd(), testFilePath));

    delete (global as any).describe;
    delete (global as any).beforeEach;
    delete (global as any).afterEach;
    delete (global as any).test;
  });
}

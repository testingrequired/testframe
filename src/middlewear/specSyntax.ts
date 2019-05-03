import path from "path";
import Setup from "../types/Setup";
import callWith from "../utils/callWith";
import TestFunction from "../types/TestFunction";
import flat from "../utils/flat";

export default function loadTests(setup: Setup) {
  const { testFilePaths, tests } = setup;

  testFilePaths.forEach(testFilePath => {
    const describes = [];
    let describeIsSkipped;

    function describe(description: string, fn: any) {
      describes.push(description);
      fn();
      describes.pop();
    }

    (global as any).describe = describe;

    describe.skip = (description: string, fn: any) => {
      describeIsSkipped = true;
      describe(description, fn);
      describeIsSkipped = false;
    };

    const beforeEachs = [[]];
    (global as any).beforeEach = fn => {
      if (beforeEachs.length <= describes.length) beforeEachs.push([]);
      beforeEachs[describes.length].push(fn);
    };

    const afterEachs = [[]];
    (global as any).afterEach = fn => {
      if (afterEachs.length <= describes.length) afterEachs.push([]);
      afterEachs[describes.length].push(fn);
    };

    function test(description: string, fn: TestFunction) {
      const depth = describes.length;

      const wrapped: () => TestFunction = () => {
        const sliceEnd = depth + 1;
        const testsBeforeEachs = flat(beforeEachs.slice(0, sliceEnd));
        const testsAfterEachs = flat(afterEachs.slice(0, sliceEnd));

        return describeIsSkipped
          ? () => {}
          : () => {
              testsBeforeEachs.forEach(callWith());
              fn();
              testsAfterEachs.forEach(callWith());
            };
      };

      const testDescription = [...describes, description].join(" ");

      tests.push({
        testFilePath,
        description: testDescription,
        fn: wrapped(),
        runState: describeIsSkipped ? "skip" : "run"
      });
    }

    (global as any).test = test;

    (global as any).it = test;

    test.skip = (description: string, fn: TestFunction) => {
      const testDescription = [...describes, description].join(" ");

      tests.push({
        testFilePath,
        description: testDescription,
        fn: () => {},
        runState: "skip"
      });
    };

    require(path.join(process.cwd(), testFilePath));

    delete (global as any).describe;
    delete (global as any).beforeEach;
    delete (global as any).afterEach;
    delete (global as any).test;
  });
}

import path from "path";
import Setup from "../types/Setup";
import callWith from "../utils/callWith";
import TestFunction from "../types/TestFunction";

export default function loadTests(setup: Setup) {
  const { testFilePaths, tests } = setup;

  testFilePaths.forEach(testFilePath => {
    const describes = [];
    (global as any).describe = (description: string, fn: any) => {
      describes.push(description);
      fn();
      describes.pop();
    };

    const beforeEachs = [];
    (global as any).beforeEach = fn => {
      if (beforeEachs.length <= describes.length) beforeEachs.push([]);
      beforeEachs[describes.length].push(fn);
    };

    const afterEachs = [];
    (global as any).afterEach = fn => {
      if (afterEachs.length <= describes.length) afterEachs.push([]);
      afterEachs[describes.length].push(fn);
    };

    function test(description: string, fn: TestFunction) {
      const depth = describes.length;

      const wrapped: () => TestFunction = () => {
        const scopedBeforeEachs = beforeEachs.slice(0, depth + 1);
        const scopedAfterEachs = afterEachs.slice(0, depth + 1);

        return () => {
          scopedBeforeEachs.forEach(group => group.forEach(callWith()));
          fn();
          scopedAfterEachs.forEach(group => group.forEach(callWith()));
        };
      };

      const testDescription = [...describes, description].join(" ");

      tests.push({
        testFilePath,
        description: testDescription,
        fn: wrapped(),
        runState: "run"
      });
    }

    (global as any).test = test;

    (global as any).it = test;

    test.skip = (description: string, fn: TestFunction) => {
      tests.push({
        testFilePath,
        description,
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

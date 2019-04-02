import path from "path";
import Setup from "../types/Setup";
import callWith from "../utils/callWith";
import TestFunction from "../types/TestFunction";

export default function loadTests(setup: Setup) {
  const { testFilePaths, tests } = setup;

  testFilePaths.forEach(testFilePath => {
    const beforeEachs = [];
    (global as any).beforeEach = fn => beforeEachs.push(fn);

    const afterEachs = [];
    (global as any).afterEach = fn => afterEachs.push(fn);

    function test(description: string, fn: TestFunction) {
      const wrapped: TestFunction = (components: any) => {
        beforeEachs.map(callWith());
        fn(components);
        afterEachs.map(callWith());
      };

      tests.push({ testFilePath, description, fn: wrapped, runState: "run" });
    }

    (global as any).test = test;

    test.skip = (description: string, fn: TestFunction) => {
      const wrapped: TestFunction = (components: any) => {
        beforeEachs.map(callWith());
        fn(components);
        afterEachs.map(callWith());
      };

      tests.push({ testFilePath, description, fn: wrapped, runState: "skip" });
    };

    require(path.join(process.cwd(), testFilePath));

    delete (global as any).beforeEach;
    delete (global as any).afterEach;
    delete (global as any).test;
  });
}

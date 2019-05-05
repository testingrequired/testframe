import suiteSyntax from "./suiteSyntax";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("loadTests", () => {
  let setup: Setup;
  let beforeEachMockFn;
  let afterEachMockFn;
  let testMockFn;

  beforeEach(() => {
    beforeEachMockFn = jest.fn();
    (global as any).beforeEachMock = beforeEachMockFn;

    afterEachMockFn = jest.fn();
    (global as any).afterEachMock = afterEachMockFn;

    testMockFn = jest.fn();
    (global as any).testMock = testMockFn;

    setup = createSetup();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe("basic", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/suite/exampleTest.js"
      ];
    });

    it("should load one test", () => {
      suiteSyntax(setup);

      expect(setup.tests.length).toBe(1);
    });

    it("should load run test", () => {
      suiteSyntax(setup);

      expect(setup.tests[0].description).toBe("test1");
      expect(setup.tests[0].runState).toBe("run");
      setup.tests[0].fn();
      expect(beforeEachMockFn).toHaveBeenNthCalledWith(1);
      expect(testMockFn).toHaveBeenNthCalledWith(1);
      expect(afterEachMockFn).toHaveBeenNthCalledWith(1);
    });

    it("should run hooks for each test", () => {
      suiteSyntax(setup);

      setup.tests[0].fn();

      expect(beforeEachMockFn).toBeCalledTimes(1);
      expect(afterEachMockFn).toBeCalledTimes(1);
    });
  });

  describe("skip", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/suite/skipTest.js"
      ];
    });

    it("should load skipped test", () => {
      suiteSyntax(setup);

      expect(setup.tests[0].description).toBe("test2");
      expect(setup.tests[0].runState).toBe("skip");
      setup.tests[0].fn();

      expect(testMockFn).not.toBeCalled();
    });
  });
});

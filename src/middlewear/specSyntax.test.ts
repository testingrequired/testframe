import specSyntax from "./specSyntax";
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
        "./src/middlewear/testUtils/exampleTests/spec/exampleTest.js"
      ];
    });

    it("should load correct number of tests", () => {
      specSyntax(setup);

      expect(setup.tests.length).toBe(1);
    });

    it("should load run test", () => {
      specSyntax(setup);

      expect(setup.tests[0].description).toBe("test1");
      expect(setup.tests[0].runState).toBe("run");
      setup.tests[0].fn();
      expect(beforeEachMockFn).toHaveBeenNthCalledWith(1);
      expect(testMockFn).toHaveBeenNthCalledWith(1);
      expect(afterEachMockFn).toHaveBeenNthCalledWith(1);
    });
  });

  describe("skip", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/skipTest.js"
      ];
    });

    it("should load skipped test", () => {
      specSyntax(setup);

      expect(setup.tests[0].description).toBe("test2");
      expect(setup.tests[0].runState).toBe("skip");
      setup.tests[0].fn();

      expect(setup.tests[1].description).toBe("describe skips test3");
      expect(setup.tests[1].runState).toBe("skip");
      setup.tests[1].fn();

      expect(setup.tests[2].description).toBe(
        "describe skips nested describe skips test4"
      );
      expect(setup.tests[2].runState).toBe("skip");
      setup.tests[2].fn();

      expect(beforeEachMockFn).not.toBeCalled();
      expect(testMockFn).not.toBeCalled();
      expect(afterEachMockFn).not.toBeCalled();
    });
  });

  describe("describe", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/describeTest.js"
      ];
    });

    it("should load correct number of tests", () => {
      specSyntax(setup);

      expect(setup.tests.length).toBe(3);
    });

    it("should load run test", () => {
      specSyntax(setup);

      expect(setup.tests[0].description).toBe("nested test");
      expect(setup.tests[0].runState).toBe("run");
      setup.tests[0].fn();
      expect(beforeEachMockFn).toHaveBeenCalledTimes(1);
      expect(testMockFn).toHaveBeenNthCalledWith(1);
      expect(afterEachMockFn).toHaveBeenCalledTimes(1);

      beforeEachMockFn.mockReset();
      testMockFn.mockReset();
      afterEachMockFn.mockReset();

      expect(setup.tests[1].description).toBe("nested deeper test");
      expect(setup.tests[1].runState).toBe("run");
      setup.tests[1].fn();
      expect(beforeEachMockFn).toHaveBeenCalledTimes(2);
      expect(testMockFn).toHaveBeenNthCalledWith(1);
      expect(afterEachMockFn).toHaveBeenCalledTimes(2);

      beforeEachMockFn.mockReset();
      testMockFn.mockReset();
      afterEachMockFn.mockReset();

      expect(setup.tests[2].description).toBe("test");
      expect(setup.tests[2].runState).toBe("run");
      setup.tests[2].fn();
      expect(beforeEachMockFn).toHaveBeenCalledTimes(0);
      expect(testMockFn).toHaveBeenNthCalledWith(1);
      expect(afterEachMockFn).toHaveBeenCalledTimes(0);
    });
  });
});

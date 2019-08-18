import specSyntax from "./specSyntax";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

function runSetupTests(setup: Setup) {
  setup.tests.forEach(test => test.fn());
}

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

  describe("beforeEach", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/beforeEachTest.js"
      ];

      specSyntax(setup);
      runSetupTests(setup);
    });

    it("should call beforeEach hooks", () => {
      expect(testMockFn).toBeCalledTimes(4);
      expect(beforeEachMockFn).toBeCalledTimes(8);
    });
  });

  describe("bare beforeEach", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/bareBeforeEachTest.js"
      ];

      specSyntax(setup);
      runSetupTests(setup);
    });

    it("should call beforeEach hooks", () => {
      expect(testMockFn).toBeCalledTimes(1);
      expect(beforeEachMockFn).toBeCalledTimes(2);
    });
  });

  describe("test descriptions", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/describeTestDescriptionTest.js"
      ];

      specSyntax(setup);
    });

    it("should have correct nesting", () => {
      expect(setup.tests[0].description).toEqual("describe 1 test 1");
      expect(setup.tests[1].description).toEqual(
        "describe 1 describe 2 test 2"
      );
      expect(setup.tests[2].description).toEqual(
        "describe 1 describe 2 describe 3 test 3"
      );
      expect(setup.tests[3].description).toEqual(
        "describe 1 describe 2 test 4"
      );
    });
  });

  describe("skip", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/skipTest.js"
      ];

      specSyntax(setup);
      runSetupTests(setup);
    });

    it("should label test as skipped", () => {
      expect(setup.tests[0].runState).toEqual("skip");
      expect(setup.tests[1].runState).toEqual("skip");
    });

    it("should not run tests", () => {
      expect(testMockFn).toBeCalledTimes(0);
    });
  });
});

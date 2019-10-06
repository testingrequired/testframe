import suiteSyntax from "./suiteSyntax";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

function runSetupTests(setup: Setup) {
  setup.tests.forEach(test => test.fn());
}

const expectedTestPath = "./src/middlewear/testUtils/exampleTests/test.js";
const mockTestPath = "./testUtils/exampleTests/test.js";

describe("suiteSyntax", () => {
  let setup: Setup;
  let beforeEachMockFn;
  let afterEachMockFn;
  let testMockFn;

  beforeEach(() => {
    beforeEachMockFn = jest.fn();
    afterEachMockFn = jest.fn();
    testMockFn = jest.fn();

    setup = createSetup();

    setup.testFilePaths = [expectedTestPath];
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe("test", () => {
    describe("when defined", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          test("testDescription", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should define a test", () => {
        expect(setup.tests).toHaveLength(1);
      });

      it("should set test description", () => {
        expect(setup.tests[0].description).toEqual("testDescription");
      });

      it("should set test run state", () => {
        expect(setup.tests[0].runState).toEqual("run");
      });

      it("should be called when test run", () => {
        expect(testMockFn).toBeCalledTimes(1);
      });
    });

    describe("when defined as skipped", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          test.skip("testDescription", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should set test run state to skipped", () => {
        expect(setup.tests[0].runState).toEqual("skip");
      });

      it("should be called when test run", () => {
        expect(testMockFn).toBeCalledTimes(0);
      });
    });
  });

  describe("beforeEach", () => {
    describe("when defined", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          beforeEach(beforeEachMockFn);

          test("", testMockFn);
          test("", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should be called for each test", () => {
        expect(beforeEachMockFn).toBeCalledTimes(2);
      });
    });

    describe("when defined multiple times", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          beforeEach(beforeEachMockFn);
          beforeEach(beforeEachMockFn);

          test("", testMockFn);
          test("", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should be called twice for each test", () => {
        expect(beforeEachMockFn).toBeCalledTimes(4);
      });
    });

    describe("when defined with skipped test", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          beforeEach(beforeEachMockFn);

          test.skip("", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should not be called", () => {
        expect(beforeEachMockFn).toBeCalledTimes(0);
      });
    });
  });

  describe("afterEach", () => {
    describe("when defined", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          afterEach(afterEachMockFn);

          test("", testMockFn);
          test("", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should be called for each test", () => {
        expect(afterEachMockFn).toBeCalledTimes(2);
      });
    });

    describe("when defined multiple times", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          afterEach(afterEachMockFn);
          afterEach(afterEachMockFn);

          test("", testMockFn);
          test("", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should be called twice for each test", () => {
        expect(afterEachMockFn).toBeCalledTimes(4);
      });
    });

    describe("when defined with skipped test", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          afterEach(afterEachMockFn);

          test.skip("", testMockFn);
        });

        suiteSyntax(setup);
        runSetupTests(setup);
      });

      it("should not be called", () => {
        expect(afterEachMockFn).toBeCalledTimes(0);
      });
    });
  });
});

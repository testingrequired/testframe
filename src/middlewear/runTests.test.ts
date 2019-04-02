import runTests from "./runTests";
import Setup from "../types/Setup";
import Test from "../types/Test";
import Results from "../types/Results";

describe("runTests", () => {
  const expectedTest: Test = {
    testFilePath: "test file path 1",
    description: "description 1",
    runState: "run",
    fn: jest.fn()
  };

  const expectedTests = [expectedTest];

  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: expectedTests
  };

  let results: Results;

  beforeEach(() => {
    results = [];
  });

  it("should run test", () => {
    runTests(setup, results);
    expect(expectedTest.fn).toBeCalledWith(setup.components);
  });

  it("should set state to passed", () => {
    runTests(setup, results);
    expect(results[0].state).toEqual("passed");
  });

  it.todo("should set start date");

  it.todo("should set end date");

  describe("when test throws error", () => {
    let error;
    beforeEach(() => {
      error = new Error();

      (expectedTest.fn as any).mockImplementation(() => {
        throw error;
      });
    });

    it("should set state to failed", () => {
      runTests(setup, results);
      expect(results[0].state).toEqual("failed");
    });

    it("should set error to error thrown", () => {
      runTests(setup, results);
      expect(results[0].error).toEqual(error);
    });
  });

  describe("when run state is skip", () => {
    beforeEach(() => {
      expectedTest.runState = "skip";
    });

    it("should set state to skipped", () => {
      runTests(setup, results);
      expect(results[0].state).toEqual("skipped");
    });
  });

  describe("multiple tests", () => {
    const expectedTest2: Test = {
      testFilePath: "test file path 2",
      description: "description 2",
      runState: "run",
      fn: jest.fn()
    };

    const expectedTest3: Test = {
      testFilePath: "test file path 3",
      description: "description 3",
      runState: "run",
      fn: jest.fn()
    };

    beforeEach(() => {
      expectedTests.push(expectedTest2, expectedTest3);
    });

    it("should run all tests", () => {
      runTests(setup, results);
      expect(expectedTest.fn).toBeCalledWith(setup.components);
      expect(expectedTest2.fn).toBeCalledWith(setup.components);
      expect(expectedTest3.fn).toBeCalledWith(setup.components);
    });
  });
});

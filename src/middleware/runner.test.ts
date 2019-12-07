import runner from "./runner";
import Setup from "../types/Setup";
import Test from "../types/Test";
import Results from "../types/Results";
import createTest from "./testUtils/createTest";
import createSetup from "./testUtils/createSetup";
import { AssertionError } from "assert";

jest.mock("events");

describe("runTests", () => {
  const expectedTest: Test = createTest("1");
  const expectedTests = [expectedTest];
  const setup: Setup = createSetup(expectedTests);

  let results: Results;

  beforeEach(() => {
    results = [];
    setup.assertionErrorsTypes.push(AssertionError);
  });

  it("should run test", () => {
    runner(setup)(results);
    expect(expectedTest.fn).toBeCalledWith();
  });

  it("should set test file path from", () => {
    runner(setup)(results);
    expect(results[0].testFilePath).toEqual(expectedTest.testFilePath);
  });

  it("should set description from test", () => {
    runner(setup)(results);
    expect(results[0].description).toEqual(expectedTest.description);
  });

  it("should set state to passed", () => {
    runner(setup)(results);
    expect(results[0].state).toEqual("passed");
  });

  it.todo("should set start date");

  it.todo("should set end date");

  describe("events", () => {
    it("should emit on test start for each test", () => {
      runner(setup)(results);
      expect(setup.events.emit).toBeCalledWith("test:start", expectedTest);
    });

    it("should emit on test result for each test", () => {
      expectedTests.push(createTest("2"));
      runner(setup)(results);
      expect(setup.events.emit).toBeCalledWith("test:result", results[0]);
      expect(setup.events.emit).toBeCalledWith("test:result", results[1]);
    });

    describe("when test failure", () => {
      let error: Error;

      beforeEach(() => {
        error = new AssertionError({});

        (expectedTest.fn as any).mockImplementation(() => {
          throw error;
        });
      });

      it("should set state to failed", () => {
        runner(setup)(results);
        expect(results[0].state).toEqual("failed");
      });

      it("should emit test:failure", () => {
        runner(setup)(results);
        expect(setup.events.emit).toBeCalledWith("test:failure", results[0]);
      });
    });
  });

  describe("when test throws error", () => {
    let error: Error;

    beforeEach(() => {
      error = new Error();

      (expectedTest.fn as any).mockImplementation(() => {
        throw error;
      });
    });

    it("should set state to failed", () => {
      runner(setup)(results);
      expect(results[0].state).toEqual("errored");
    });

    it("should emit test:error", () => {
      runner(setup)(results);
      expect(setup.events.emit).toBeCalledWith("test:error", results[0]);
    });

    it("should set error to error thrown", () => {
      runner(setup)(results);
      expect(results[0].error).toEqual(error);
    });
  });

  describe("when run state is skip", () => {
    beforeEach(() => {
      expectedTest.runState = "skip";
    });

    it("should set state to skipped", () => {
      runner(setup)(results);
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
      runner(setup)(results);
      expect(expectedTest.fn).toBeCalledWith();
      expect(expectedTest2.fn).toBeCalledWith();
      expect(expectedTest3.fn).toBeCalledWith();
    });
  });
});

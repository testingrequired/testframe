import runTests from "./runTests";
import Setup from "../types/Setup";
import Test from "../types/Test";
import Results from "../types/Results";
import { EventEmitter } from "events";
import createTest from "./testUtils/createTest";
import createSetup from "./testUtils/createSetup";

jest.mock("events");

describe("runTests", () => {
  const expectedTest: Test = createTest("1");
  const expectedTests = [expectedTest];
  const setup: Setup = createSetup(expectedTests);

  let results: Results;
  let events: EventEmitter;

  beforeEach(() => {
    results = [];
    events = new EventEmitter();
  });

  it("should run test", () => {
    runTests(setup, results, events);
    expect(expectedTest.fn).toBeCalledWith(setup.components);
  });

  it("should set test file path from", () => {
    runTests(setup, results, events);
    expect(results[0].testFilePath).toEqual(expectedTest.testFilePath);
  });

  it("should set description from test", () => {
    runTests(setup, results, events);
    expect(results[0].description).toEqual(expectedTest.description);
  });

  it("should set state to passed", () => {
    runTests(setup, results, events);
    expect(results[0].state).toEqual("passed");
  });

  it.todo("should set start date");

  it.todo("should set end date");

  describe("events", () => {
    it("should emit on test start for each test", () => {
      runTests(setup, results, events);
      expect(events.emit).toBeCalledWith("test:start", expectedTest);
    });

    it("should emit on test result for each test", () => {
      expectedTests.push(createTest("2"));
      runTests(setup, results, events);
      expect(events.emit).toBeCalledWith("test:result", results[0]);
      expect(events.emit).toBeCalledWith("test:result", results[1]);
    });

    describe("when test failure", () => {
      let error;
      beforeEach(() => {
        error = new Error();

        (expectedTest.fn as any).mockImplementation(() => {
          throw error;
        });
      });

      it("should emit test:failure", () => {
        runTests(setup, results, events);
        expect(events.emit).toBeCalledWith("test:failure", results[0]);
      });
    });
  });

  describe("when test throws error", () => {
    let error;
    beforeEach(() => {
      error = new Error();

      (expectedTest.fn as any).mockImplementation(() => {
        throw error;
      });
    });

    it("should set state to failed", () => {
      runTests(setup, results, events);
      expect(results[0].state).toEqual("failed");
    });

    it("should set error to error thrown", () => {
      runTests(setup, results, events);
      expect(results[0].error).toEqual(error);
    });
  });

  describe("when run state is skip", () => {
    beforeEach(() => {
      expectedTest.runState = "skip";
    });

    it("should set state to skipped", () => {
      runTests(setup, results, events);
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
      runTests(setup, results, events);
      expect(expectedTest.fn).toBeCalledWith(setup.components);
      expect(expectedTest2.fn).toBeCalledWith(setup.components);
      expect(expectedTest3.fn).toBeCalledWith(setup.components);
    });
  });
});

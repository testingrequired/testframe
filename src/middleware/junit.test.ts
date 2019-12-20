import junitMiddleware from "./junit";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";
//@ts-ignore
import junit from "junit-report-builder";

jest.mock("junit-report-builder");

describe("junit", () => {
  const expectedFilePath = "expected file path";
  const resultId = "result1";

  let setup: Setup;
  let results: Results;
  let testSuite: any;
  let testCase: any;

  beforeEach(() => {
    setup = createSetup();

    testCase = {
      name: jest.fn(() => testCase),
      time: jest.fn(),
      failure: jest.fn(),
      stacktrace: jest.fn(),
      skipped: jest.fn()
    };

    testSuite = {
      name: jest.fn(() => testSuite),
      testCase: () => testCase
    };

    junit.testSuite.mockReturnValue(testSuite);

    results = [createResult(resultId)];
  });

  afterEach(() => {
    junit.testSuite.mockReset();
  });

  describe("when state is passing", () => {
    beforeEach(() => {
      junitMiddleware(expectedFilePath)(setup);

      setup.events.emit("results", results);
    });

    it("should set test suite name to test file path", () => {
      expect(testSuite.name).toBeCalledWith(
        `test/file/path/${resultId}.test.js`
      );
    });

    it("should set test case to test description", () => {
      expect(testCase.name).toBeCalledWith(`${resultId} description`);
    });

    it("should set test case time to test time", () => {
      expect(testCase.time).toBeCalledWith(results[0].time);
    });

    it("should write to file", () => {
      expect(junit.writeTo).toBeCalledWith(expectedFilePath);
    });
  });

  describe("when state is failed", () => {
    const expectedErrorMessage = "expected error message";

    beforeEach(() => {
      results[0].state = "failed";
      results[0].error = new Error(expectedErrorMessage);

      junitMiddleware(expectedFilePath)(setup);

      setup.events.emit("results", results);
    });

    it("should set test case failure to test case error message", () => {
      junitMiddleware(expectedFilePath)(setup);
      expect(testCase.failure).toBeCalledWith(
        results[0].error && results[0].error.message
      );
    });

    it("should set test case stacktrace to test case error stacktrace", () => {
      junitMiddleware(expectedFilePath)(setup);
      expect(testCase.stacktrace).toBeCalledWith(
        results[0].error && results[0].error.stack
      );
    });
  });

  describe("when state is skipped", () => {
    beforeEach(() => {
      results[0].state = "skipped";

      junitMiddleware(expectedFilePath)(setup);

      setup.events.emit("results", results);
    });

    it("should set test case skipped", () => {
      expect(testCase.skipped).toBeCalledTimes(1);
    });
  });

  describe("when multiple results in same test suite", () => {
    beforeEach(() => {
      results.push(createResult(resultId));

      junitMiddleware(expectedFilePath)(setup);

      setup.events.emit("results", results);
    });

    it("should not create test suites", () => {
      expect(junit.testSuite).toBeCalledTimes(1);
    });
  });
});

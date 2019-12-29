import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import failureReporter from "./failureReporter";
import Result from "../types/Result";
import createResult from "./testUtils/createResult";

describe("failureReporter", () => {
  let setup: Setup;
  let results: Results;
  let result: Result;
  let consoleMock: jest.SpyInstance;

  beforeEach(() => {
    setup = createSetup();
    result = createResult("result1", "failed");
    results = [result];
    result.error = new Error();
    result.error.stack = "expected stack";
    result.error.message = "expected message";

    consoleMock = jest.spyOn(console, "log");
  });

  afterEach(() => {
    consoleMock.mockReset();
  });

  it("", () => {
    failureReporter(setup);
    setup.events.emit("results", results);
    expect(consoleMock.mock.calls.length).toBe(3);
    expect(consoleMock.mock.calls[0]).toEqual(["Failures: 1\n"]);
    expect(consoleMock.mock.calls[1]).toEqual([
      "test/file/path/result1.test.js: result1 description"
    ]);
    expect(consoleMock.mock.calls[2]).toEqual(["expected message"]);
  });
});

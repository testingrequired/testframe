import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import errorReporter from "./errorReporter";
import Result from "../types/Result";
import createResult from "./testUtils/createResult";

describe("errorReporter", () => {
  let setup: Setup;
  let results: Results;
  let result: Result;
  let consoleMock: jest.SpyInstance;

  beforeEach(() => {
    setup = createSetup();
    result = createResult("result1", "errored");
    results = [result];
    result.error = new Error();
    result.error.stack = "expected stack";

    consoleMock = jest.spyOn(console, "log");
  });

  afterEach(() => {
    consoleMock.mockReset();
  });

  it("", () => {
    errorReporter(setup);
    setup.events.emit("results", results);
    expect(consoleMock.mock.calls.length).toBe(3);
    expect(consoleMock.mock.calls[1]).toEqual([
      "test/file/path/result1.test.js: result1 description"
    ]);
    expect(consoleMock.mock.calls[2]).toEqual(["expected stack"]);
  });
});

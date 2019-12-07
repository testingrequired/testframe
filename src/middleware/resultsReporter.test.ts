import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import { resultsReporter } from ".";
import Result from "../types/Result";
import createResult from "./testUtils/createResult";

describe("resultsReporter", () => {
  let setup: Setup;
  let results: Results;
  let result: Result;
  let consoleMock: jest.SpyInstance;

  beforeEach(() => {
    setup = createSetup();
    result = createResult("result1");
    results = [result];
    consoleMock = jest.spyOn(console, "log");
  });

  afterEach(() => {
    consoleMock.mockReset();
  });

  describe("with passing result", () => {
    beforeEach(() => {
      result.state = "passed";
    });

    it("should work", () => {
      resultsReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(6);
      expect(consoleMock.mock.calls[0]).toEqual(["Results:\n"]);
      expect(consoleMock.mock.calls[1]).toEqual([
        "[test/file/path/result1.test.js (5 ms)]:"
      ]);
      expect(consoleMock.mock.calls[2]).toEqual([]);
      expect(consoleMock.mock.calls[3]).toEqual([
        "- passed: result1 description (5 ms)"
      ]);
      expect(consoleMock.mock.calls[4]).toEqual([]);
      expect(consoleMock.mock.calls[5]).toEqual(["\n"]);
    });
  });

  describe("with failing result", () => {
    beforeEach(() => {
      result.state = "failed";
      result.error = new Error("error message");
    });

    it("should work", () => {
      resultsReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(8);
      expect(consoleMock.mock.calls[0]).toEqual(["Results:\n"]);
      expect(consoleMock.mock.calls[1]).toEqual([
        "[test/file/path/result1.test.js (5 ms)]:"
      ]);
      expect(consoleMock.mock.calls[2]).toEqual([]);
      expect(consoleMock.mock.calls[3]).toEqual([
        "- failed: result1 description (5 ms)"
      ]);
      expect(consoleMock.mock.calls[4]).toEqual([]);
      expect(consoleMock.mock.calls[5]).toEqual(["error message"]);
      expect(consoleMock.mock.calls[6]).toEqual([]);
      expect(consoleMock.mock.calls[7]).toEqual(["\n"]);
    });
  });

  describe("with errored result", () => {
    beforeEach(() => {
      result.state = "errored";
      result.error = new Error("error message");
      result.error.stack = "error stacktrace";
    });

    it("should work", () => {
      resultsReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(9);
      expect(consoleMock.mock.calls[0]).toEqual(["Results:\n"]);
      expect(consoleMock.mock.calls[1]).toEqual([
        "[test/file/path/result1.test.js (5 ms)]:"
      ]);
      expect(consoleMock.mock.calls[2]).toEqual([]);
      expect(consoleMock.mock.calls[3]).toEqual([
        "- errored: result1 description (5 ms)"
      ]);
      expect(consoleMock.mock.calls[4]).toEqual([]);
      expect(consoleMock.mock.calls[5]).toEqual(["Error: error message\n"]);
      expect(consoleMock.mock.calls[6]).toEqual(["Stack: error stacktrace"]);
      expect(consoleMock.mock.calls[7]).toEqual([]);
      expect(consoleMock.mock.calls[8]).toEqual(["\n"]);
    });
  });
});

import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import tapReporter from "./tapReporter";
import Result from "../types/Result";
import createResult from "./testUtils/createResult";

describe("tapReporter", () => {
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

  it("calls console", () => {
    tapReporter(setup);
    setup.events.emit("results", results);
    expect(consoleMock.mock.calls.length).toBe(3);
    expect(consoleMock.mock.calls[0]).toEqual(["1..1"]);
  });

  describe("with multiple tests", () => {
    beforeEach(() => {
      results.push(createResult("result2"));
    });

    it("calls console", () => {
      tapReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(4);
      expect(consoleMock.mock.calls[1]).toEqual(["ok 1 result1 description"]);
      expect(consoleMock.mock.calls[2]).toEqual(["ok 2 result2 description"]);
    });
  });

  describe("with passing result", () => {
    beforeEach(() => {
      result.state = "passed";
    });

    it("should work", () => {
      tapReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls[1]).toEqual(["ok 1 result1 description"]);
    });
  });

  describe("with skipped result", () => {
    beforeEach(() => {
      result.state = "skipped";
    });

    it("should work", () => {
      tapReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls[1]).toEqual([
        "ok 1 result1 description # skip"
      ]);
    });
  });

  describe("with failing result", () => {
    beforeEach(() => {
      result.state = "failed";
      result.error = new Error("error message");
    });

    it("should work", () => {
      tapReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls[1]).toEqual([
        "not ok 1 result1 description"
      ]);
    });
  });

  describe("with errored result", () => {
    beforeEach(() => {
      result.state = "errored";
      result.error = new Error("error message");
      result.error.stack = "error stacktrace";
    });

    it("should work", () => {
      tapReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls[1]).toEqual([
        "not ok 1 result1 description"
      ]);
    });
  });
});

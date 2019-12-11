import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import { dotReporter } from ".";
import Result from "../types/Result";
import createResult from "./testUtils/createResult";

describe("dotReporter", () => {
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

  describe("with multiple results", () => {
    beforeEach(() => {
      result.state = "passed";
      const result2 = createResult("result2");
      result2.state = "failed";
      results.push(result2);
      const result3 = createResult("result3");
      result3.state = "errored";
      results.push(result3);
    });

    it("should work", () => {
      dotReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(3);
      expect(consoleMock.mock.calls[0]).toEqual(["\n"]);
      expect(consoleMock.mock.calls[1]).toEqual([".fe"]);
      expect(consoleMock.mock.calls[2]).toEqual(["\n"]);
    });
  });

  describe("with passing result", () => {
    beforeEach(() => {
      result.state = "passed";
    });

    it("should work", () => {
      dotReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(3);
      expect(consoleMock.mock.calls[0]).toEqual(["\n"]);
      expect(consoleMock.mock.calls[1]).toEqual(["."]);
      expect(consoleMock.mock.calls[2]).toEqual(["\n"]);
    });
  });

  describe("with failing result", () => {
    beforeEach(() => {
      result.state = "failed";
      result.error = new Error("error message");
    });

    it("should work", () => {
      dotReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(3);
      expect(consoleMock.mock.calls[0]).toEqual(["\n"]);
      expect(consoleMock.mock.calls[1]).toEqual(["f"]);
      expect(consoleMock.mock.calls[2]).toEqual(["\n"]);
    });
  });

  describe("with skipped result", () => {
    beforeEach(() => {
      result.state = "skipped";
    });

    it("should work", () => {
      dotReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(3);
      expect(consoleMock.mock.calls[0]).toEqual(["\n"]);
      expect(consoleMock.mock.calls[1]).toEqual(["s"]);
      expect(consoleMock.mock.calls[2]).toEqual(["\n"]);
    });
  });

  describe("with todo result", () => {
    beforeEach(() => {
      result.state = "todo";
    });

    it("should work", () => {
      dotReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(3);
      expect(consoleMock.mock.calls[0]).toEqual(["\n"]);
      expect(consoleMock.mock.calls[1]).toEqual(["t"]);
      expect(consoleMock.mock.calls[2]).toEqual(["\n"]);
    });
  });

  describe("with errored result", () => {
    beforeEach(() => {
      result.state = "errored";
      result.error = new Error("error message");
      result.error.stack = "error stacktrace";
    });

    it("should work", () => {
      dotReporter(setup);
      setup.events.emit("results", results);
      expect(consoleMock.mock.calls.length).toBe(3);
      expect(consoleMock.mock.calls[0]).toEqual(["\n"]);
      expect(consoleMock.mock.calls[1]).toEqual(["e"]);
      expect(consoleMock.mock.calls[2]).toEqual(["\n"]);
    });
  });
});

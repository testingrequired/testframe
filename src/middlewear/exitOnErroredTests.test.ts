import exitOnErroredTests from "./exitOnErroredTests";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";
import { EventEmitter } from "events";

describe("exitOnErroredTests", () => {
  const setup: Setup = createSetup();
  const events = new EventEmitter();

  const expectedExitCode = 2;

  let results: Results;
  let oldExit;

  beforeEach(() => {
    oldExit = process.exit;
    (process.exit as any) = jest.fn();

    results = [];
  });

  afterEach(() => {
    process.exit = oldExit;
  });

  describe("when test error", () => {
    beforeEach(() => {
      results.push(createResult("1", "errored"));
    });

    it("should exit with code", () => {
      exitOnErroredTests(setup, events)(results);
      events.emit("results", results);
      expect(process.exit).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when no test errors", () => {
    beforeEach(() => {
      results.push(createResult("1", "errored"));
    });

    it("should exit with code", () => {
      exitOnErroredTests(setup, events)(results);
      expect(process.exit).not.toHaveBeenCalled();
    });
  });
});

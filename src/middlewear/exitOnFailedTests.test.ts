import exitOnFailedTests from "./exitOnFailedTests";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";
import { EventEmitter } from "events";

describe("exitOnFailedTests", () => {
  const setup: Setup = createSetup();
  const events = new EventEmitter();

  const expectedExitCode = 1;

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

  describe("when test failure", () => {
    beforeEach(() => {
      results.push(createResult("1", "failed"));
    });

    it("should exit with code", () => {
      exitOnFailedTests(setup, events)(results);
      events.emit("results", results);
      expect(process.exit).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when no test failures", () => {
    beforeEach(() => {
      results.push(createResult("1", "passed"));
    });

    it("should exit with code", () => {
      exitOnFailedTests(setup, events)(results);
      expect(process.exit).not.toHaveBeenCalled();
    });
  });
});

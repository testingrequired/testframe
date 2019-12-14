import exitOnFailedTests from "./exitOnFailedTests";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";

describe("exitOnFailedTests", () => {
  const setup: Setup = createSetup();

  const expectedExitCode = 1;

  let results: Results;
  let oldExit: any;

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
      exitOnFailedTests(setup);
      setup.events.emit("results", results);
      expect(process.exit).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when no test failures", () => {
    beforeEach(() => {
      results.push(createResult("1", "passed"));
    });

    it("should exit with code", () => {
      exitOnFailedTests(setup);
      expect(process.exit).not.toHaveBeenCalled();
    });
  });
});

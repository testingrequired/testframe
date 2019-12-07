import exitOnErroredTests from "./exitOnErroredTests";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";

describe("exitOnErroredTests", () => {
  const setup: Setup = createSetup();

  const expectedExitCode = 2;

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

  describe("when test error", () => {
    beforeEach(() => {
      results.push(createResult("1", "errored"));
    });

    it("should exit with code", () => {
      exitOnErroredTests(setup);
      setup.events.emit("results", results);
      expect(process.exit).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when no test errors", () => {
    beforeEach(() => {
      results.push(createResult("1", "errored"));
    });

    it("should exit with code", () => {
      exitOnErroredTests(setup);
      expect(process.exit).not.toHaveBeenCalled();
    });
  });
});

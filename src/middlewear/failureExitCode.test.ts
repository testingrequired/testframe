import failureExitCode from "./failureExitCode";
import Setup from "../types/Setup";
import Results from "../types/Results";

describe("failureExitCode", () => {
  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: []
  };

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
      results.push({ state: "failed" });
    });

    it("should exit with code", () => {
      failureExitCode(expectedExitCode)(setup, results);
      expect(process.exit).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when no test failures", () => {
    beforeEach(() => {
      results.push({ state: "passed" });
    });

    it("should exit with code", () => {
      failureExitCode(expectedExitCode)(setup, results);
      expect(process.exit).not.toHaveBeenCalled();
    });
  });
});

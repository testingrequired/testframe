import exitOnFailedTests from "./exitOnFailedTests";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";
import Result from "../types/Result";

describe("exitOnFailedTests", () => {
  const setup: Setup = createSetup();

  const expectedExitCode = 2;

  let results: Results;
  let result: Result;
  let spy: any;

  beforeEach(() => {
    spy = jest.fn();
    setup.events.on("exit", spy);

    result = createResult("1");
    results = [result];
  });

  describe("when test failure", () => {
    beforeEach(() => {
      result.state = "failed";
    });

    it("should exit with code", () => {
      exitOnFailedTests(setup);
      setup.events.emit("results", results);
      expect(spy).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when no test failures", () => {
    beforeEach(() => {
      result.state = "passed";
    });

    it("should exit with code", () => {
      exitOnFailedTests(setup);
      setup.events.emit("results", results);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

import exitOnErroredTests from "./exitOnErroredTests";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";
import Result from "../types/Result";

describe("exitOnErroredTests", () => {
  const setup: Setup = createSetup();

  const expectedExitCode = 1;

  let results: Results;
  let result: Result;
  let spy: any;

  beforeEach(() => {
    spy = jest.fn();
    setup.events.on("exit", spy);

    result = createResult("1");
    results = [result];
  });

  describe("when test errored", () => {
    beforeEach(() => {
      result.state = "errored";
    });

    it("should exit with code", () => {
      exitOnErroredTests(setup);
      setup.events.emit("results", results);
      expect(spy).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when no test failures", () => {
    beforeEach(() => {
      result.state = "passed";
    });

    it("should exit with code", () => {
      exitOnErroredTests(setup);
      setup.events.emit("results", results);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

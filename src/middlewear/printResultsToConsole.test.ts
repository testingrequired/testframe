import printResultsToConsole from "./printResultsToConsole";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";

describe("printResultsToConsole", () => {
  const setup: Setup = createSetup();

  const results: Results = [createResult("1")];

  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  it("should call console.log with json stringified results", () => {
    printResultsToConsole(setup, results);

    expect(logSpy).toBeCalledWith(JSON.stringify(results, null, 2));
  });
});

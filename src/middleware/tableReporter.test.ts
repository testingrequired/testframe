import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import tableReporter from "./tableReporter";
import Result from "../types/Result";
import createResult from "./testUtils/createResult";

describe("tableReporter", () => {
  let setup: Setup;
  let results: Results;
  let result: Result;
  let consoleLogMock: jest.SpyInstance;
  let consoleTableMock: jest.SpyInstance;

  beforeEach(() => {
    setup = createSetup();
    result = createResult("result1");
    results = [result];
    consoleLogMock = jest.spyOn(console, "log");
    consoleTableMock = jest.spyOn(console, "table");
  });

  afterEach(() => {
    consoleLogMock.mockReset();
  });

  it("should call console.table", () => {
    tableReporter(setup);
    setup.events.emit("results", results);

    expect(consoleTableMock).toBeCalledWith(results, [
      "testFilePath",
      "description",
      "time",
      "state"
    ]);
  });
});

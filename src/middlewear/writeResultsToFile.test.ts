import writeResultsToFile from "./writeResultsToFile";
import Setup from "../types/Setup";
import Results from "../types/Results";
import path from "path";
import fs from "fs";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";

jest.mock("fs");

describe("printResultsToConsole", () => {
  const setup: Setup = createSetup();
  const results: Results = [createResult("1")];
  const expectedCwd = "expected cwd";
  const expectedFileName = "file.ext";

  let cwd;

  beforeEach(() => {
    cwd = jest.spyOn(process, "cwd");

    cwd.mockImplementation(() => expectedCwd);
  });

  it("should call console.log with json stringified results", () => {
    writeResultsToFile(expectedFileName)(setup)(results);

    expect(fs.writeFileSync).toBeCalledWith(
      `${expectedCwd}${path.sep}${expectedFileName}`,
      JSON.stringify(results, null, 2)
    );
  });
});

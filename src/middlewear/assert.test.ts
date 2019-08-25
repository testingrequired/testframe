import assertMiddlewear from "./assert";
import globals from "./globals";
import Setup from "../types/Setup";
import assert from "assert";
import createSetup from "./testUtils/createSetup";

jest.mock("./globals");

describe("mock", () => {
  let setup: Setup;
  let setupMiddlewear = jest.fn();

  beforeEach(() => {
    setup = createSetup();

    (globals as any).mockImplementation(() => setupMiddlewear);
  });

  it("should create globals", () => {
    assertMiddlewear(setup);

    expect(globals).toBeCalledWith("assert", assert);
    expect(setupMiddlewear).toBeCalledWith(setup);
  });
});

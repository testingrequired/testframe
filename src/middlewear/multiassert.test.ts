import multiassertMiddlewear from "./multiassert";
import globals from "./globals";
import Setup from "../types/Setup";
import multiassert from "@testingrequired/multiassert";
import createSetup from "./testUtils/createSetup";

jest.mock("./globals");

describe("multiassert", () => {
  let setup: Setup;
  let setupMiddlewear = jest.fn();

  beforeEach(() => {
    setup = createSetup();

    (globals as any).mockImplementation(() => setupMiddlewear);
  });

  it("should create globals", () => {
    multiassertMiddlewear(setup);

    expect(globals).toBeCalledWith("multiassert", multiassert);
    expect(setupMiddlewear).toBeCalledWith(setup);
  });
});

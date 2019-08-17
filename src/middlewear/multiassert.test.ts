import { default as multiassertMiddlewear } from "./multiassert";
import globals from "./globals";
import Setup from "../types/Setup";
import multiassert from "@testingrequired/multiassert";

jest.mock("./globals");

describe("multiassert", () => {
  let setup: Setup;
  let setupMiddlewear = jest.fn();

  beforeEach(() => {
    setup = jest.fn() as any;

    (globals as any).mockImplementation(() => setupMiddlewear);
  });

  it("should create global", () => {
    multiassertMiddlewear(setup);

    expect(globals).toBeCalledWith("multiassert", multiassert);
  });
});

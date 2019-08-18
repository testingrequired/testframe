import mock from "./mock";
import globals from "./globals";
import Setup from "../types/Setup";
import testdouble from "testdouble";

jest.mock("./globals");

describe("mock", () => {
  let setup: Setup;
  let setupMiddlewear = jest.fn();

  beforeEach(() => {
    setup = jest.fn() as any;

    (globals as any).mockImplementation(() => setupMiddlewear);
  });

  it("should create globals", () => {
    mock(setup);

    expect(globals).toBeCalledWith("mock", testdouble);
    expect(globals).toBeCalledWith("verify", testdouble.verify);
    expect(globals).toBeCalledWith("when", testdouble.when);
    expect(setupMiddlewear).toBeCalledWith(setup);
  });
});

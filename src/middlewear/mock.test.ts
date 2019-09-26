import mock from "./mock";
import Setup from "../types/Setup";
import testdouble from "testdouble";
import createSetup from "./testUtils/createSetup";

describe("mock", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    mock(setup);

    expect(setup.globals.mock).toBe(testdouble);
    expect(setup.globals.verify).toBe(testdouble.verify);
    expect(setup.globals.when).toBe(testdouble.when);
  });
});

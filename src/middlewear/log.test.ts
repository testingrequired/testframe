import logMiddlewear from "./log";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("log", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    logMiddlewear(setup);

    expect(setup.globals.console).toEqual(console);
  });
});

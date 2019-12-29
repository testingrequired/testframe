import fixtures from "./fixtures";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("fixtures", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    fixtures(setup);

    expect(setup.globals.fixtures).toBe(setup.fixtures);
  });
});

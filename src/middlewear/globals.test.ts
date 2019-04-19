import globals from "./globals";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("component", () => {
  const setup: Setup = createSetup();

  it("should call fn with setup and results", () => {
    globals("foo", "bar")(setup);
    expect(setup.globals.foo).toEqual("bar");
  });
});

import globals from "./globals";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("globals", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should call fn with setup and results", () => {
    globals("foo", "bar")(setup);
    expect(setup.globals.foo).toEqual("bar");
  });

  it("should throw error if global already registered", () => {
    globals("foo", "bar")(setup);

    expect(() => {
      globals("foo", "bar")(setup);
    }).toThrow(
      "Global 'foo' already registered. Please check your middleware load order."
    );
  });
});

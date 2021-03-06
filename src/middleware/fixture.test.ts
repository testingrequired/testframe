import fixture from "./fixture";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("fixture", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should call fn with setup and results", async () => {
    fixture<string>("foo", async () => "bar")(setup);
    expect(await setup.fixtures.foo).toEqual("bar");
  });

  it("should throw error if global already registered", () => {
    fixture("foo", async () => "bar")(setup);

    expect(() => {
      fixture("foo", async () => "bar")(setup);
    }).toThrow(
      "Fixture 'foo' already registered. Please check your middleware load order."
    );
  });
});

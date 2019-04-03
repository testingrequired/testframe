import component from "./component";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("component", () => {
  const setup: Setup = createSetup();

  it("should call fn with setup and results", () => {
    component("foo", "bar")(setup);
    expect(setup.components.foo).toEqual("bar");
  });
});

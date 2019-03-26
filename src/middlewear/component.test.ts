import component from "./component";
import Setup from "../types/Setup";

describe("component", () => {
  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: []
  };

  it("should call fn with setup and results", () => {
    component("foo", "bar")(setup);
    expect(setup.components.foo).toEqual("bar");
  });
});

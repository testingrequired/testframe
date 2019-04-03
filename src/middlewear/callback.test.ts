import callback from "./callback";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";

describe("callback", () => {
  let fn;

  const setup: Setup = createSetup();

  const results: Results = [];

  beforeEach(() => {
    fn = jest.fn();
  });

  it("should call fn with setup and results", () => {
    callback(fn)(setup, results);
    expect(fn).toBeCalledWith(setup, results);
  });
});

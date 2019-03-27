import callback from "./callback";
import Setup from "../types/Setup";
import Results from "../types/Results";

describe("callback", () => {
  let fn;

  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: []
  };

  const results: Results = [];

  beforeEach(() => {
    fn = jest.fn();
  });

  it("should call fn with setup and results", () => {
    callback(fn)(setup, results);
    expect(fn).toBeCalledWith(setup, results);
  });
});

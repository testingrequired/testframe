import compose from "./compose";
import Setup from "../types/Setup";
import Results from "../types/Results";

describe("compose", () => {
  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: []
  };

  const results: Results = [];

  let middlewearA;
  let middlewearB;
  let middlewears;

  beforeEach(() => {
    middlewearA = jest.fn();
    middlewearB = jest.fn();
    middlewears = [middlewearA, middlewearB];
  });

  it("should call each middlewear", () => {
    compose(...middlewears)(setup, results);

    expect(middlewearA).toBeCalledWith(setup, results);
    expect(middlewearB).toBeCalledWith(setup, results);
  });
});

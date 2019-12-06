import compose from "./compose";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";

jest.mock("events");

describe("compose", () => {
  const setup: Setup = createSetup();

  const results: Results = [];

  let middlewareA;
  let middlewareAResultsExecutor;
  let middlewareB;
  let middlewareBResultsExecutor;
  let middlewares;

  beforeEach(() => {
    middlewareAResultsExecutor = jest.fn();
    middlewareA = jest.fn(() => middlewareAResultsExecutor);
    middlewareBResultsExecutor = jest.fn();
    middlewareB = jest.fn(() => middlewareBResultsExecutor);
    middlewares = [middlewareA, middlewareB];

  });

  it("should call each middleware and results executor", () => {
    compose(...middlewares)(setup)(results);

    expect(middlewareA).toBeCalledWith(setup);
    expect(middlewareAResultsExecutor).toBeCalledWith(results);
    expect(middlewareB).toBeCalledWith(setup);
    expect(middlewareBResultsExecutor).toBeCalledWith(results);
  });
});

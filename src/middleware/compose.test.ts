import compose from "./compose";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import Middleware, { ResultsExecutor } from "../types/Middleware";

jest.mock("events");

describe("compose", () => {
  const setup: Setup = createSetup();

  const results: Results = [];

  let middlewareA: Middleware;
  let middlewareAResultsExecutor: ResultsExecutor;
  let middlewareB: Middleware;
  let middlewareBResultsExecutor: ResultsExecutor;
  let middlewares: Array<Middleware>;

  beforeEach(() => {
    middlewareAResultsExecutor = jest.fn();
    middlewareA = jest.fn(() => middlewareAResultsExecutor);
    middlewareBResultsExecutor = jest.fn();
    middlewareB = jest.fn(() => middlewareBResultsExecutor);
    middlewares = [middlewareA, middlewareB];
  });

  it("should call each middleware and results executor", async () => {
    await (await compose(...middlewares)(setup))(results);

    expect(middlewareA).toBeCalledWith(setup);
    expect(middlewareAResultsExecutor).toBeCalledWith(results);
    expect(middlewareB).toBeCalledWith(setup);
    expect(middlewareBResultsExecutor).toBeCalledWith(results);
  });
});

import Middleware, { SetupExecutor, ResultsExecutor } from "./types/Middleware";
import Setup from "./types/Setup";
import config from "./config";

describe("config", () => {
  let middlewares: Array<Middleware>;
  let middlewareASetupExector: SetupExecutor;
  let middlewareAResultsExector: ResultsExecutor;
  let middlewareBSetupExector: SetupExecutor;
  let middlewareBResultsExector: ResultsExecutor;

  beforeEach(() => {
    middlewareAResultsExector = jest.fn();
    middlewareASetupExector = jest.fn(
      async (setup: Setup) => middlewareAResultsExector
    );

    middlewareBResultsExector = jest.fn();
    middlewareBSetupExector = jest.fn(
      async (setup: Setup) => middlewareBResultsExector
    );

    middlewares = [middlewareASetupExector, middlewareBSetupExector];
  });

  it("should not call middleware", () => {
    config(...middlewares);

    expect(middlewareASetupExector).not.toHaveBeenCalled();
    expect(middlewareAResultsExector).not.toHaveBeenCalled();
    expect(middlewareBSetupExector).not.toHaveBeenCalled();
    expect(middlewareBResultsExector).not.toHaveBeenCalled();
  });

  describe("returned function", () => {
    it("should call middleware", async () => {
      await config(...middlewares)();

      expect(middlewareASetupExector).toHaveBeenCalled();
      expect(middlewareAResultsExector).toHaveBeenCalled();
      expect(middlewareBSetupExector).toHaveBeenCalled();
      expect(middlewareBResultsExector).toHaveBeenCalled();
    });
  });
});

import Middleware, { SetupExecutor, ResultsExecutor } from "./types/Middleware";
import Setup from "./types/Setup";
import config from "./config";
import Results from "./types/Results";

describe("config", () => {
  let middlewares: Array<Middleware>;
  let middlewareASetupExector: SetupExecutor;
  let middlewareAResultsExector: ResultsExecutor;
  let middlewareBSetupExector: SetupExecutor;
  let middlewareBResultsExector: ResultsExecutor;
  let oldExit: any;

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

    oldExit = process.exit;
    (process.exit as any) = jest.fn();
  });

  afterEach(() => {
    process.exit = oldExit;
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

  describe("captured exit codes", () => {
    it("should call exit with exit code emitted in setup", async () => {
      const expectedExitCode = 2;

      function s(setup: Setup) {
        setup.events.emit("exit", expectedExitCode);
      }

      const exitCode = await config(s, ...middlewares)();

      expect(exitCode).toBe(expectedExitCode);
    });

    it("should call exit with exit code emitted in result", async () => {
      const expectedExitCode = 2;

      function s(setup: Setup) {
        return function r(results: Results) {
          setup.events.emit("exit", expectedExitCode);
        };
      }

      const exitCode = await config(s, ...middlewares)();

      expect(exitCode).toBe(expectedExitCode);
    });

    it("should call exit lowest non zero exit code", async () => {
      function s(setup: Setup) {
        return function r(results: Results) {
          setup.events.emit("exit", 6);
          setup.events.emit("exit", 3);
          setup.events.emit("exit", 2);
          setup.events.emit("exit", 10);
        };
      }

      const exitCode = await config(s, ...middlewares)();

      expect(exitCode).toBe(2);
    });

    describe("when exit is call during setup", () => {
      it("should call exit with lowest setup non zero exit code", async () => {
        function s(setup: Setup) {
          setup.events.emit("exit", 2);

          return function r(results: Results) {
            setup.events.emit("exit", 1);
          };
        }

        const exitCode = await config(s, ...middlewares)();

        expect(exitCode).toBe(2);
      });
    });
  });
});

import Middleware, { ResultsExecutor } from "./types/Middleware";
import Setup from "./types/Setup";
import Results from "./types/Results";
import { EventEmitter } from "events";

/**
 * Returns a function that executes middlewares
 *
 * Eeach middleware setup function and each optionally returned results function
 *
 * @param middlewares Middlewares to run
 * @returns {() => void} Function that executes middlewares
 */
const config = (...middlewares: Array<Middleware>) => async () => {
  const setup: Setup = {
    events: new EventEmitter(),
    testFilePaths: [],
    assertionErrorsTypes: [],
    globals: {},
    tests: [],
    args: {}
  };
  const results: Results = [];

  const resultExecutors: Array<ResultsExecutor> = [];

  for (const middleware of middlewares) {
    const resultExecutor = await middleware(setup);

    if (resultExecutor) {
      resultExecutors.push(resultExecutor);
    }
  }

  setup.events.emit("setup", setup);

  for (const resultExector of resultExecutors) {
    await resultExector(results);
  }
};

export default config;

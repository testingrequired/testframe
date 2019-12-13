import Middleware from "./types/Middleware";
import Setup from "./types/Setup";
import Results from "./types/Results";
import { EventEmitter } from "events";
import notEmpty from "./utils/notEmpty";

/**
 * Returns a function that executes middlewares
 *
 * Eeach middleware setup function and each optionally returned results function
 *
 * @param middlewares Middlewares to run
 * @returns {() => void} Function that executes middlewares
 */
const config = (...middlewares: Array<Middleware>) => () => {
  const setup: Setup = {
    events: new EventEmitter(),
    testFilePaths: [],
    assertionErrorsTypes: [],
    globals: {},
    tests: [],
    args: {}
  };
  const results: Results = [];

  const resultExecutors = middlewares
    .map(middlewareSetup => middlewareSetup(setup))
    .filter(notEmpty);

  setup.events.emit("setup", setup);

  resultExecutors.forEach(middlewareResults => middlewareResults(results));
};

export default config;

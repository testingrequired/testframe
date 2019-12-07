import Middleware from "./types/Middleware";
import Setup from "./types/Setup";
import Results from "./types/Results";
import { EventEmitter } from "events";
import notEmpty from "./utils/notEmpty";

export default (...middlewares: Middleware[]) => () => {
  const setup: Setup = {
    events: new EventEmitter(),
    testFilePaths: [],
    assertionErrorsTypes: [],
    globals: {},
    tests: [],
    args: {}
  };
  const results: Results = [];
  const events = new EventEmitter();

  const resultExecutors = middlewares.map(setupPhase =>
    setupPhase(setup)
  );

  events.emit("setup", setup);

  resultExecutors.filter(notEmpty).map(resultsPhase => resultsPhase(results));

  events.emit("results", results);
};

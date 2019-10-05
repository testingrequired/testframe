import Middlewear from "./types/Middlewear";
import Setup from "./types/Setup";
import Results from "./types/Results";
import { EventEmitter } from "events";
import notEmpty from "./utils/notEmpty";

export default (...middlewears: Middlewear[]) => () => {
  const setup: Setup = {
    testFilePaths: [],
    globals: {},
    tests: [],
    args: {}
  };
  const results: Results = [];
  const events = new EventEmitter();

  const resultExecutors = middlewears.map(setupPhase =>
    setupPhase(setup, events)
  );

  events.emit("setup", setup);

  resultExecutors.filter(notEmpty).map(resultsPhase => resultsPhase(results));

  events.emit("results", results);
};

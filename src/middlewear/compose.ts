import Setup from "../types/Setup";
import Results from "../types/Results";
import Middlewear from "../types/Middlewear";
import { EventEmitter } from "events";
import notEmpty from "../utils/notEmpty";

export default (...middlewears: Array<Middlewear>) => (
  setup: Setup,
  events: EventEmitter
) => {
  const resultExecutors = middlewears.map(setupPhase =>
    setupPhase(setup, events)
  );

  return (results: Results) =>
    resultExecutors.filter(notEmpty).map(resultsPhase => resultsPhase(results));
};

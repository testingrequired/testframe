import Setup from "../types/Setup";
import Results from "../types/Results";
import Middleware from "../types/Middleware";
import { EventEmitter } from "events";
import notEmpty from "../utils/notEmpty";

export default (...middlewares: Array<Middleware>) => (
  setup: Setup,
  events: EventEmitter
) => {
  const resultExecutors = middlewares.map(setupPhase =>
    setupPhase(setup, events)
  );

  return (results: Results) =>
    resultExecutors.filter(notEmpty).map(resultsPhase => resultsPhase(results));
};

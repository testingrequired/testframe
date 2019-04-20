import Setup from "../types/Setup";
import Results from "../types/Results";
import Middlewear from "../types/Middlewear";
import { EventEmitter } from "events";
import callWith from "../utils/callWith";

export default (...middlewears: Array<Middlewear>) => (
  setup: Setup,
  events: EventEmitter
) => {
  const resultExecutors = middlewears
    .map(callWith(setup, events))
    .filter(x => x);

  return (results: Results) => {
    resultExecutors.forEach(callWith(results));
  };
};

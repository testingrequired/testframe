import Setup from "../types/Setup";
import Results from "../types/Results";
import Middlewear from "../types/Middlewear";
import callWith from "../utils/callWith";
import { EventEmitter } from "events";

export default (...middlewears: Array<Middlewear>) => (
  setup: Setup,
  results: Results,
  events: EventEmitter
) => {
  middlewears.forEach(callWith(setup, results, events));
};

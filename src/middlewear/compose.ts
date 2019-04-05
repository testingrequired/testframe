import Setup from "../types/Setup";
import Results from "../types/Results";
import Middlewear from "../types/Middlewear";
import { EventEmitter } from "events";
import callMiddlewearExecutors from "../utils/callMiddlewearExecutors";

export default (...middlewears: Array<Middlewear>) => (
  setup: Setup,
  events: EventEmitter
) => (results: Results) =>
  callMiddlewearExecutors(setup, events, results, ...middlewears);

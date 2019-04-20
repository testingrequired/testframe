import Middlewear from "../types/Middlewear";
import callWith from "./callWith";

import Setup from "../types/Setup";
import Results from "../types/Results";
import { EventEmitter } from "events";

export default (
  setup: Setup,
  events: EventEmitter,
  results: Results,
  ...middlewears: Array<Middlewear>
) => middlewears.map(callWith(setup, events)).forEach(fn => fn && fn(results));

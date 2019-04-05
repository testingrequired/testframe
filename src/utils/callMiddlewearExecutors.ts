import Middlewear from "../types/Middlewear";
import callWith from "./callWith";
import call from "./call";
import Setup from "../types/Setup";
import Results from "../types/Results";
import { EventEmitter } from "events";

export default (
  setup: Setup,
  results: Results,
  events?: EventEmitter,
  ...middlewears: Array<Middlewear>
) => {
  middlewears
    .map(callWith(setup, results, events))
    .filter(x => x)
    .forEach(call);
};

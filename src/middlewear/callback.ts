import Setup from "../types/Setup";
import Results from "../types/Results";
import Middlewear from "../types/Middlewear";
import { EventEmitter } from "events";

export default (callback: Middlewear) => (
  setup: Setup,
  results: Results,
  events: EventEmitter
) => {
  debugger;
  callback(setup, results, events);
};

import Setup from "../types/Setup";
import Results from "../types/Results";
import { EventEmitter } from "events";

export default (event: string, callback: any) => (
  setup: Setup,
  results: Results,
  events: EventEmitter
) => {
  events.on(event, callback);
};

import Setup from "../types/Setup";
import { EventEmitter } from "events";

export default (event: string, callback: any) => (
  setup: Setup,
  events: EventEmitter
) => {
  events.on(event, callback);
};

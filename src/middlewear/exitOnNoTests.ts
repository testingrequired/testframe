import Setup from "../types/Setup";
import { EventEmitter } from "events";

export default (setup: Setup, events?: EventEmitter) => {
  events.on("setup", (completeSetup: Setup) => {
    if (completeSetup.tests.length === 0) process.exit(1);
  });
};

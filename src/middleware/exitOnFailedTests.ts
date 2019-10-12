import Results from "../types/Results";
import Setup from "../types/Setup";
import { EventEmitter } from "events";

export default (setup: Setup, events?: EventEmitter) => (results: Results) => {
  events.on("results", results => {
    const failureFound = results.find(result => result.state === "failed");
    if (failureFound) process.exit(1);
  });
};

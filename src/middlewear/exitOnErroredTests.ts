import Results from "../types/Results";
import Setup from "../types/Setup";
import { EventEmitter } from "events";

export default (setup: Setup, events?: EventEmitter) => (results: Results) => {
  events.on("results", (results: Results) => {
    const errorFound = results.find(result => result.state === "errored");
    if (errorFound) process.exit(2);
  });
};

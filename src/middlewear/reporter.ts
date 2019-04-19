import Setup from "../types/Setup";
import { EventEmitter } from "events";
import Result from "../types/Result";

export default function printResults(setup: Setup, events?: EventEmitter) {
  events.on("test:result", (result: Result) => {
    console.log(JSON.stringify(result, null, 2));
  });
}

import Setup from "../types/Setup";
import Results from "../types/Results";
import { EventEmitter } from "events";
import Result from "../types/Result";

export default function printResults(
  setup: Setup,
  results: Results,
  events?: EventEmitter
) {
  events.on("test:result", (result: Result) => {
    console.log(JSON.stringify(result, null, 2));
  });
}

import Setup from "../types/Setup";
import { EventEmitter } from "events";
import Results from "../types/Results";
import groupBy from "../utils/groupBy";
import Result from "../types/Result";

export default function printResults(setup: Setup, events?: EventEmitter) {
  events.on("results", (results: Results) => {
    console.log("Results:\n");

    Object.entries(groupBy<Result[]>(results, "testFilePath")).forEach(
      entry => {
        const [testFilePath, results] = entry;

        console.log(
          `[${testFilePath} (${results[results.length - 1].end.getTime() -
            results[0].start.getTime()} ms)]:`
        );

        console.log();

        results.forEach(result => {
          console.log(
            `- ${result.state}: ${result.description} (${result.end.getTime() -
              result.start.getTime()} ms)`
          );

          if (result.state === "failed") {
            console.log();
            console.log(`${result.error.message}`);
          }

          if (result.state === "errored") {
            console.log();
            console.log(`Error: ${result.error.message}\n`);
            console.log(`Stack: ${result.error.stack}`);
          }

          console.log();
        });

        console.log("\n");
      }
    );
  });
}

function jsonFriendlyErrorReplacer(key, value) {
  if (value instanceof Error) {
    return {
      // Pull all enumerable properties, supporting properties on custom Errors
      ...value,
      // Explicitly pull Error's non-enumerable properties
      name: value.name,
      message: value.message,
      stack: value.stack
    };
  }

  return value;
}

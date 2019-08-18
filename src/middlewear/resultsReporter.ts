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

        const testFileTime =
          results[results.length - 1].end.getTime() -
          results[0].start.getTime();

        console.log(`[${testFilePath} (${testFileTime} ms)]:`);
        console.log();

        results.forEach(({ end, start, state, description, error }) => {
          const timeTime = end.getTime() - start.getTime();

          console.log(`- ${state}: ${description} (${timeTime} ms)`);

          if (state === "failed") {
            console.log();
            console.log(`${error.message}`);
          }

          if (state === "errored") {
            console.log();
            console.log(`Error: ${error.message}\n`);
            console.log(`Stack: ${error.stack}`);
          }

          console.log();
        });

        console.log("\n");
      }
    );
  });
}

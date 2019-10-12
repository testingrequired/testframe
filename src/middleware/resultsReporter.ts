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

        const testFileTime = results.reduce(
          (time, result) => time + result.time,
          0
        );

        console.log(`[${testFilePath} (${testFileTime} ms)]:`);
        console.log();

        results.forEach(({ state, description, error, time }) => {
          console.log(`- ${state}: ${description} (${time} ms)`);

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

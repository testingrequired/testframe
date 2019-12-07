import Setup from "../types/Setup";
import Results from "../types/Results";
import groupBy from "../utils/groupBy";
import Result from "../types/Result";

export default (setup: Setup) => {
  setup.events.on("results", (results: Results) => {
    Object.entries(groupBy<Result[]>(results, "testFilePath")).forEach(
      entry => {
        const [testFilePath, results] = entry;

        const testFileTime = results.reduce(
          (time, result) => time + result.time,
          0
        );

        console.log(`[${testFilePath} (${testFileTime} ms)]:`);
        console.log();

        console.table(results, ["description", "time", "state", "error"]);

        console.log("\n");
      }
    );
  });
}

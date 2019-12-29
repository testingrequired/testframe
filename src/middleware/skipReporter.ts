import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  const skippedResults = results.filter(result => result.state === "skipped");

  console.log(`Skipped: ${skippedResults.length}\n`);

  skippedResults.forEach(result => {
    console.log(`${result.testFilePath}: ${result.description}`);
  });
});

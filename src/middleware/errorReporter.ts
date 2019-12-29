import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  const errorResults = results.filter(result => result.state === "errored");

  console.log(`Errors: ${errorResults.length}\n`);

  errorResults.forEach(errorResult => {
    if (errorResult.error) {
      console.log(`${errorResult.testFilePath}: ${errorResult.description}`);
      console.log(`${errorResult.error.stack}`);
    }
  });
});

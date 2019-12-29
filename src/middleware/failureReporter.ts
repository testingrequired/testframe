import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  const failResults = results.filter(result => result.state === "failed");

  console.log(`Failures: ${failResults.length}\n`);

  failResults.forEach(result => {
    if (result.error) {
      console.log(`${result.testFilePath}: ${result.description}`);
      console.log(`${result.error.message}`);
    }
  });
});

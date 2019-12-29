import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  const todoResults = results.filter(result => result.state === "todo");

  console.log(`Todo: ${todoResults.length}\n`);

  todoResults.forEach(result => {
    console.log(`${result.testFilePath}: ${result.description}`);
  });
});

import Result from "../types/Result";
import event from "./event";

export default event("results", (results: Array<Result>) => {
  const failureFound = results.find((result: Result) => result.state === "failed");
  if (failureFound) process.exit(1);
});
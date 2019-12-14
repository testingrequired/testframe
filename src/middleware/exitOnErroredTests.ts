import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  const errorFound = results.find(result => result.state === "errored");
  if (errorFound) process.exit(2);
});
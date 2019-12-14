import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  console.table(results, ["testFilePath", "description", "time", "state"]);
});

import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  const dots = results
    .map(result => {
      switch (result.state) {
        case "passed":
          return ".";
        case "skipped":
          return "s";
        case "failed":
          return "f";
        case "todo":
          return "t";
        case "errored":
          return "e";
      }
    })
    .join("");

  console.log("\n");
  console.log(dots);
  console.log("\n");
});

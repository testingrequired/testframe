import event from "./event";
import Result from "../types/Result";

export default event("results", (results: Array<Result>) => {
  console.log(`1..${results.length}`);

  results.forEach((result, index) => {
    const ok =
      result.state === "passed" || result.state === "skipped" ? "ok" : "not ok";
    const testNumber = index + 1;
    const items = [ok, testNumber, result.description];

    if (result.state === "skipped") {
      items.push("# skip");
    }

    console.log(items.join(" "));
  });

  console.log("\n");
});

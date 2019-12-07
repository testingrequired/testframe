import Setup from "../types/Setup";
import Results from "../types/Results";

export default (setup: Setup) => {
  setup.events.on("results", (results: Results) => {
    console.log(`1..${setup.tests.length}`);

    results.forEach((result, index) => {
      const ok = result.state === "passed" || result.state === "skipped" ? "ok" : "not ok";
      const testNumber = index + 1;
      const items = [ok, testNumber, result.description];

      if (result.state === "skipped") {
        items.push("# skip");
      }

      console.log(items.join(" "));
    });

    console.log("\n");
  });
}

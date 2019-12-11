import Setup from "../types/Setup";
import Results from "../types/Results";

export default (setup: Setup) => {
  setup.events.on("results", (results: Results) => {
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
};

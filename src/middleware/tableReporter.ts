import Setup from "../types/Setup";
import Results from "../types/Results";

export default (setup: Setup) => {
  setup.events.on("results", (results: Results) => {
    console.table(results, ["testFilePath", "description", "time", "state", "error"]);
  });
}

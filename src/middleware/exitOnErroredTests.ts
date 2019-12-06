import Setup from "../types/Setup";
import Results from "../types/Results";

export default (setup: Setup) => {
  setup.events.on("results", (results: Results) => {
    const errorFound = results.find(result => result.state === "errored");
    if (errorFound) process.exit(2);
  });
};

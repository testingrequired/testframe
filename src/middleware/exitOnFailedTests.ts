import Results from "../types/Results";
import Setup from "../types/Setup";

export default (setup: Setup) => (results: Results) => {
  setup.events.on("results", results => {
    const failureFound = results.find(result => result.state === "failed");
    if (failureFound) process.exit(1);
  });
};

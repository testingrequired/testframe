import Results from "../types/Results";
import Setup from "../types/Setup";
import Result from "../types/Result";

export default (setup: Setup) => (results: Results) => {
  setup.events.on("results", results => {
    const failureFound = results.find((result: Result) => result.state === "failed");
    if (failureFound) process.exit(1);
  });
};

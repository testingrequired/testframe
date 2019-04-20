import Results from "../types/Results";
import Setup from "../types/Setup";

export default (exitCode: number = 1) => (setup: Setup) => (
  results: Results
) => {
  const failureFound = results.find(result => result.state === "failed");
  if (failureFound) process.exit(exitCode);
};

import Results from "../types/Results";
import Setup from "../types/Setup";

export default (setup: Setup) => (results: Results) => {
  const failureFound = results.find(result => result.state === "failed");
  if (failureFound) process.exit(1);
};

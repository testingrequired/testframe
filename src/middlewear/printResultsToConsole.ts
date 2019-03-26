import Setup from "../types/Setup";
import Results from "../types/Results";

export default function printResults(setup: Setup, results: Results) {
  console.log(JSON.stringify(results, null, 2));
}

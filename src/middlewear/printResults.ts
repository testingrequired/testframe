import Setup from "../Setup";
import Results from "../Results";

export default function printResults(setup: Setup, results: Results) {
  console.log(JSON.stringify(results, null, 2));
}

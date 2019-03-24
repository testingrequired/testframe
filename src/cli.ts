import path from "path";
import tf from "./index";
import globTestFiles from "./middlewear/globTestFiles";
import runTests from "./middlewear/runTests";
import printResultsToConsole from "./middlewear/printResultsToConsole";
import writeResultsToFile from "./middlewear/writeResultsToFile";

const run = tf(
  globTestFiles("./tests/*.test.js"),
  runTests,
  printResultsToConsole,
  writeResultsToFile(path.join(process.cwd(), "results.json"))
);

run();

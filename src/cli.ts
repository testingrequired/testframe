import path from "path";
import tf from "./index";
import globTestFiles from "./middlewear/globTestFiles";
import runFlatTests from "./middlewear/runFlatTests";
import printResultsToConsole from "./middlewear/printResultsToConsole";
import writeResultsToFile from "./middlewear/writeResultsToFile";

tf(
  globTestFiles("./tests/*.test.js"),
  runFlatTests,
  printResultsToConsole,
  writeResultsToFile(path.join(process.cwd(), "results.json"))
);

import path from "path";
import tf from "./index";

const {
  globTestFiles,
  runTests,
  printResultsToConsole,
  writeResultsToFile
} = tf.middlewear;

const run = tf(
  globTestFiles("./tests/*.test.js"),
  runTests,
  printResultsToConsole,
  writeResultsToFile(path.join(process.cwd(), "results.json"))
);

run();

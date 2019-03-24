import tf from "./index";
import Setup from "./Setup";
import Results from "./Results";

const { middlewear } = tf;

const {
  findTestFiles,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  setupFile,
  writeResultsToJunitFile,
  callback,
  failureExitCode
} = middlewear;

const run = tf(
  setupFile("./setupTests.js"),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  callback((setup: Setup, results: Results) => {}),
  printResultsToConsole,
  failureExitCode(),
  writeResultsToJunitFile("results.xml"),
  writeResultsToFile("results.json")
);

run();

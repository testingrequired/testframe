import tf from "./index";

const { middlewear } = tf;

const {
  findTestFiles,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  setupFile
} = middlewear;

const run = tf(
  setupFile("./setupTests.js"),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile("results.json")
);

run();

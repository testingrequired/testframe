import tf from "./index";

const { middlewear } = tf;

const {
  findTestFiles,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  setupFile,
  writeResultsToJunitFile
} = middlewear;

const run = tf(
  setupFile("./setupTests.js"),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToJunitFile("results.xml"),
  writeResultsToFile("results.json")
);

run();

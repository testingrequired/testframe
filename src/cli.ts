import tf from "./index";

const { middlewear } = tf;

const {
  findTestFiles,
  component,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile
} = middlewear;

const run = tf(
  findTestFiles("./tests/*.test.js"),
  component("testValue", 100),
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile("results.json")
);

run();

import tf from "./index";

const {
  findTestFiles,
  component,
  runTests,
  printResultsToConsole,
  writeResultsToFile
} = tf.middlewear;

const run = tf(
  findTestFiles("./tests/*.test.js", "./tests/*.spec.js"),
  component("testValue", 100),
  runTests,
  printResultsToConsole,
  writeResultsToFile("results.json")
);

run();

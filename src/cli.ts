import tf from "./index";

const {
  findTestFiles,
  component,
  runTests,
  printResultsToConsole,
  writeResultsToFile
} = tf.middlewear;

const run = tf.compose(
  [
    tf(
      findTestFiles("./tests/*.test.js"),
      component("testValue", 100),
      runTests
    ),
    tf(
      findTestFiles("./tests/*.spec.js"),
      runTests,
      writeResultsToFile("results2.json")
    )
  ],
  printResultsToConsole,
  writeResultsToFile("results.json")
);

run();

import assert from "assert";
import tf from "./index";

const { middlewear } = tf;

const {
  findTestFiles,
  component,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  writeResultsToJunitFile,
  failureExitCode
} = middlewear;

const run = tf(
  component("assert", assert),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  printResultsToConsole,
  failureExitCode(),
  writeResultsToJunitFile("results.xml"),
  writeResultsToFile("results.json")
);

run();

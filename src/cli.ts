import assert from "assert";
import tf, {
  findTestFiles,
  component,
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToFile,
  writeResultsToJunitFile
} from "./index";

export const run = tf(
  component("assert", assert),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToJunitFile("results.xml"),
  writeResultsToFile("results.json")
);

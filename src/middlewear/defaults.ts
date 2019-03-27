import assert from "assert";
import compose from "./compose";
import component from "./component";
import findTestFiles from "./findTestFiles";
import loadTests from "./loadTests";
import runTests from "./runTests";
import printResultsToConsole from "./printResultsToConsole";
import writeResultsToJunitFile from "./writeResultsToJunitFile";
import writeResultsToFile from "./writeResultsToFile";

export default compose(
  component("assert", assert),
  findTestFiles("./tests/*.test.js"),
  loadTests,
  runTests,
  printResultsToConsole,
  writeResultsToJunitFile("results.xml"),
  writeResultsToFile("results.json")
);

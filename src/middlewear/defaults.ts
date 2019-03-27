import assert from "assert";
import compose from "./compose";
import component from "./component";
import findTestFiles from "./findTestFiles";
import loadTests from "./loadTests";
import runTests from "./runTests";
import printResultsToConsole from "./printResultsToConsole";
import writeResultsToJunitFile from "./writeResultsToJunitFile";

interface Options {
  testFilePatterns?: string[];
  junitFilePath?: string;
}

export default (options: Options = {}) => {
  const patterns = options.testFilePatterns || ["./tests/*.test.js"];
  const junitFilePath = options.junitFilePath || "junit.xml";

  return compose(
    component("assert", assert),
    findTestFiles(...patterns),
    loadTests,
    runTests,
    printResultsToConsole,
    writeResultsToJunitFile(junitFilePath)
  );
};

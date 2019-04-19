import assert from "assert";
import compose from "./compose";
import component from "./component";
import matchTestFiles from "./matchTestFiles";
import specSyntax from "./specSyntax";
import runner from "./runner";
import reporter from "./reporter";
import junit from "./junit";
import randomize from "./randomize";
import failureExitCode from "./failureExitCode";
import args from "./args";

interface Options {
  testFilePatterns?: string[];
  junitFilePath?: string;
}

export default (options: Options = {}) => {
  const patterns = options.testFilePatterns || ["./tests/*.test.js"];
  const junitFilePath = options.junitFilePath || "junit.xml";

  return compose(
    args,
    component("assert", assert),
    matchTestFiles(...patterns),
    specSyntax,
    randomize,
    reporter,
    runner,
    failureExitCode(),
    junit(junitFilePath)
  );
};

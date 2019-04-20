import assert from "assert";
import compose from "./compose";
import globals from "./globals";
import matchTestFiles from "./matchTestFiles";
import specSyntax from "./specSyntax";
import runner from "./runner";
import reporter from "./reporter";
import junit from "./junit";
import randomize from "./randomize";
import exitOnFailedTests from "./exitOnFailedTests";
import args from "./args";

interface Options {
  testFilePatterns?: string[];
  junitFilePath?: string;
}

const defaultsWithOptions = (options: Options = {}) => {
  const patterns = options.testFilePatterns || ["./tests/*.test.js"];
  const junitFilePath = options.junitFilePath || "junit.xml";

  return compose(
    args,
    globals("assert", assert),
    matchTestFiles(...patterns),
    specSyntax,
    randomize,
    reporter,
    runner,
    exitOnFailedTests,
    junit(junitFilePath)
  );
};

const defaults = defaultsWithOptions();

(defaults as any).withOptions = defaultsWithOptions;

export default defaults;

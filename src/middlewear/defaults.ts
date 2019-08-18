import assert from "assert";
import compose from "./compose";
import globals from "./globals";
import runner from "./runner";
import setupReporter from "./setupReporter";
import resultsReporter from "./resultsReporter";
import junit from "./junit";
import randomize from "./randomize";
import exitOnFailedTests from "./exitOnFailedTests";
import args from "./args";
import log from "./log";

export default compose(
  args,
  globals("assert", assert),
  randomize,
  setupReporter,
  resultsReporter,
  runner,
  exitOnFailedTests,
  junit("junit.xml"),
  log
);

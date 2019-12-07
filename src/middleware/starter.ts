import assert from "assert";
import compose from "./compose";
import globals from "./globals";
import runner from "./runner";
import setupReporter from "./setupReporter";
import tableReporter from "./tableReporter";
import randomize from "./randomize";
import exitOnFailedTests from "./exitOnFailedTests";
import args from "./args";
import log from "./log";
import exitOnErroredTests from "./exitOnErroredTests";

export default compose(
  args,
  globals("assert", assert),
  randomize,
  setupReporter,
  tableReporter,
  runner,
  exitOnErroredTests,
  exitOnFailedTests,
  log
);

import compose from "./compose";
import runner from "./runner";
import setupReporter from "./setupReporter";
import tableReporter from "./tableReporter";
import randomize from "./randomize";
import exitOnFailedTests from "./exitOnFailedTests";
import args from "./args";
import log from "./log";
import exitOnErroredTests from "./exitOnErroredTests";
import assert from './assert';

export default compose(
  args,
  assert,
  randomize,
  setupReporter,
  tableReporter,
  runner,
  exitOnErroredTests,
  exitOnFailedTests,
  log
);

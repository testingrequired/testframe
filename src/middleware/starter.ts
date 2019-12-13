import compose from "./compose";
import runner from "./runner";
import setupReporter from "./setupReporter";
import tapReporter from "./tapReporter";
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
  tapReporter,
  runner,
  exitOnErroredTests,
  exitOnFailedTests,
  log
);

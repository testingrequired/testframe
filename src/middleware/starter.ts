import compose from "./compose";
import runner from "./runner";
import setupReporter from "./setupReporter";
import dotReporter from "./dotReporter";
import randomize from "./randomize";
import exitOnFailedTests from "./exitOnFailedTests";
import args from "./args";
import log from "./log";
import exitOnErroredTests from "./exitOnErroredTests";
import assert from "./assert";
import errorReporter from "./errorReporter";
import failureReporter from "./failureReporter";
import skipReporter from "./skipReporter";
import todoReporter from "./todoReporter";
import fixtures from "./fixtures";

export default compose(
  args,
  assert,
  randomize,
  setupReporter,
  dotReporter,
  failureReporter,
  errorReporter,
  skipReporter,
  todoReporter,
  runner,
  exitOnErroredTests,
  exitOnFailedTests,
  log,
  fixtures
);

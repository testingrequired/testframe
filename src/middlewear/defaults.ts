import assert from "assert";
import compose from "./compose";
import globals from "./globals";
import runner from "./runner";
import reporter from "./reporter";
import junit from "./junit";
import randomize from "./randomize";
import exitOnFailedTests from "./exitOnFailedTests";
import args from "./args";

export default compose(
  args,
  globals("assert", assert),
  randomize,
  reporter,
  runner,
  exitOnFailedTests,
  junit("junit.xml")
);

import Setup from "../../types/Setup";
import Test from "../../types/Test";
import { EventEmitter } from "events";

export default (tests: Array<Test> = []): Setup => ({
  assertionErrorsTypes: [],
  events: new EventEmitter(),
  testFilePaths: [],
  globals: {},
  tests,
  args: {}
});

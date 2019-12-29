import Test from "./Test";
import { EventEmitter } from "events";
import Constructor from "./Constructor";

export default interface Setup {
  events: EventEmitter;
  testFilePaths: Array<string>;
  globals: Record<string, any>;
  args: { [key: string]: any };
  tests: Array<Test>;
  assertionErrorsTypes: Array<Constructor<Error>>;
  fixtures: Record<string, any>;
}

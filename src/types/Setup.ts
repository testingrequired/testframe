import Test from "./Test";
import { EventEmitter } from "events";

export default interface Setup {
  events: EventEmitter;
  testFilePaths: Array<string>;
  globals: { [key: string]: any };
  args: { [key: string]: any };
  tests: Array<Test>;
}

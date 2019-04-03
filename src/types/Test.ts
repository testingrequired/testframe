import TestFunction from "./TestFunction";

export type TestStates = "run" | "skip";

export default interface Test {
  testFilePath: string;
  description: string;
  fn: TestFunction;
  runState: TestStates;
}

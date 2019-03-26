import TestFunction from "./TestFunction";

export default interface Test {
  testFilePath: string;
  description: string;
  fn: TestFunction;
  runState: "run" | "skip";
}

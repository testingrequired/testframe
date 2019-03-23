import TestFileModule from "./TestFileModule";

export default interface Setup {
  testFiles: Map<string, TestFileModule>;
}

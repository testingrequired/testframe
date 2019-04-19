import Test from "./Test";

export default interface Setup {
  testFilePaths: Array<string>;
  globals: { [key: string]: any };
  args: { [key: string]: any };
  tests: Array<Test>;
}

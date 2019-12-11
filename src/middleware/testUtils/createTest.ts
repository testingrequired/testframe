import Test, { TestStates } from "../../types/Test";

export default (id: string, runState: TestStates = "run"): Test => ({
  testFilePath: `test/file/path/${id}.test.js`,
  description: `description ${id}`,
  runState,
  fn: jest.fn(() => {
    debugger;
  })
});

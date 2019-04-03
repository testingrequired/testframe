import Result, { ResultStates } from "../../types/Result";

export default (id: string, state: ResultStates = "passed"): Result => ({
  testFilePath: `test/file/path/${id}.test.js`,
  description: `${id} description`,
  state,
  start: new Date(),
  end: new Date()
});

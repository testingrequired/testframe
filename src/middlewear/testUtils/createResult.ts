import Result, { ResultStates } from "../../types/Result";

export default (
  id: string,
  state: ResultStates = "passed",
  time: number = 5
): Result => {
  const start = new Date();
  const end = new Date(start.getTime() + time);

  return {
    testFilePath: `test/file/path/${id}.test.js`,
    description: `${id} description`,
    state,
    start,
    end,
    get time() {
      return this.end.getTime() - this.start.getTime();
    }
  };
};

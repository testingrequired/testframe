export type ResultStates = "passed" | "failed" | "errored" | "skipped";

export default interface Result {
  testFilePath?: string;
  description?: string;
  state?: ResultStates;
  error?: Error;
  start?: Date;
  end?: Date;
}

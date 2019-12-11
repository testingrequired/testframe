export type ResultStates = "passed" | "failed" | "errored" | "skipped" | "todo";

export default interface Result {
  testFilePath: string;
  description: string;
  state: ResultStates;
  error?: Error;
  start: Date;
  end: Date;
  readonly time: number;
}

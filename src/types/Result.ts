export default interface Result {
  testFilePath?: string;
  description?: string;
  state?: "passed" | "failed" | "errored" | "skipped";
  error?: Error;
  start?: Date;
  end?: Date;
}

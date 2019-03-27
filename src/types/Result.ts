export default interface Result {
  description?: Array<string>;
  state?: "passed" | "failed" | "errored" | "skipped";
  error?: Error;
  start?: Date;
  end?: Date;
}

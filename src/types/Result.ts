export default interface Result {
  state?: "passed" | "failed" | "errored" | "skipped";
  error?: Error;
  start?: Date;
  end?: Date;
}

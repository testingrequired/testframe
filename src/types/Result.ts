export default interface Result {
  state?: "passed" | "failed" | "errored";
  error?: Error;
  start?: Date;
  end?: Date;
}

import Result from "../types/Result";
import event from "./event";
import Setup from "../types/Setup";

export default (setup: Setup) =>
  event("results", (results: Array<Result>) => {
    const failureFound = results.find(
      (result: Result) => result.state === "errored"
    );
    if (failureFound) {
      setup.events.emit("exit", 1);
    }
  })(setup);

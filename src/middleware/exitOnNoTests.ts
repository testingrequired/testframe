import Setup from "../types/Setup";
import event from "./event";

export default event("setup", (setup: Setup) => {
  if (setup.tests.length === 0) process.exit(1);
});
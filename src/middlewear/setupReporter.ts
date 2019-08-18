import Setup from "../types/Setup";
import { EventEmitter } from "events";

export default function printResults(setup: Setup, events?: EventEmitter) {
  events.on("setup", (setup: Setup) => {
    console.log(`tf\n`);

    console.log(`Args:\n\n${JSON.stringify(setup.args, null, 2)}\n`);

    console.log(`Test Globals:\n\n${Object.keys(setup.globals).join(", ")}\n`);

    console.log(`Test File Paths:\n\n${setup.testFilePaths.join(", ")}\n`);
  });
}

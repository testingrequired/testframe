import Setup from "../types/Setup";
import { EventEmitter } from "events";

export default function printResults(setup: Setup, events?: EventEmitter) {
  events.on("setup", (setup: Setup) => {
    console.log(`tf\n`);

    console.log(`Args: ${JSON.stringify(setup.args)}\n`);

    console.log(`Test Globals: ${Object.keys(setup.globals).join(", ")}\n`);

    console.log(`Test File Paths: ${setup.testFilePaths.join(", ")}\n`);
  });
}

import Setup from "../types/Setup";
import { EventEmitter } from "events";

export default function printResults(setup: Setup, events?: EventEmitter) {
  events.on("setup", (setup: Setup) => {
    console.log(`tf\n`);

    const args = JSON.stringify(setup.args, null, 2);
    console.log(`Args:\n\n${args}\n`);

    const globals = JSON.stringify(Object.keys(setup.globals), null, 2);
    console.log(`Test Globals:\n\n${globals}\n`);

    const testFilePaths = JSON.stringify(setup.testFilePaths, null, 2);
    console.log(`Test File Paths:\n\n${testFilePaths}\n`);
  });
}

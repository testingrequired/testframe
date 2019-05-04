import Setup from "../types/Setup";
import { EventEmitter } from "events";
import Results from "../types/Results";

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

  events.on("results", (results: Results) => {
    console.log("Results:\n");
    results.forEach(result => {
      console.log(JSON.stringify(result, jsonFriendlyErrorReplacer, 2));
    });
  });
}

function jsonFriendlyErrorReplacer(key, value) {
  if (value instanceof Error) {
    return {
      // Pull all enumerable properties, supporting properties on custom Errors
      ...value,
      // Explicitly pull Error's non-enumerable properties
      name: value.name,
      message: value.message,
      stack: value.stack
    };
  }

  return value;
}

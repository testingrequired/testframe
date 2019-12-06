import Setup from "../types/Setup";

export default function printResults(setup: Setup) {
  setup.events.on("setup", (setup: Setup) => {
    console.log(`tf\n`);

    console.log(`Args: ${JSON.stringify(setup.args)}\n`);

    console.log(`Test Globals: ${Object.keys(setup.globals).join(", ")}\n`);

    console.log(`Test File Paths: ${setup.testFilePaths.join(", ")}\n`);
  });
}

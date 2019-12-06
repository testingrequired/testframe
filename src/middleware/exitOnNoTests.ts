import Setup from "../types/Setup";

export default (setup: Setup) => {
  setup.events.on("setup", (completeSetup: Setup) => {
    if (completeSetup.tests.length === 0) process.exit(1);
  });
};

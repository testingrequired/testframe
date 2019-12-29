import lowestNonZero from "./utils/lowestNonZero";

/**
 * Run a set of test configurations and exit
 *
 * @param configs Executable configs to run
 */
const run = async (...configs: Array<() => Promise<number>>) => {
  const capturedExitCodes: Array<number> = [];

  for (const config of configs) {
    capturedExitCodes.push(await config.call(null));
  }

  if (capturedExitCodes.length > 0) {
    process.exit(lowestNonZero(capturedExitCodes));
  }

  process.exit(0);
};

export default run;

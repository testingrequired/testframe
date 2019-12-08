/**
 * Run a set of test configurations and exit
 *
 * @param configs Executable configs to run
 */
const run = (...configs: Array<() => void>) => {
  configs.forEach(config => config());
  process.exit(0);
};

export default run;

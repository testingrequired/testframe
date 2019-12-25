/**
 * Run a set of test configurations and exit
 *
 * @param configs Executable configs to run
 */
const run = async (...configs: Array<() => void>) => {
  await Promise.all(configs.map(config => config()));

  process.exit(0);
};

export default run;

import yargs from "yargs";
import Setup from "../types/Setup";

const args = (setup: Setup) => {
  const { $0, _, ...args } = yargs.parse(process.argv);
  setup.args = { _: _.slice(2), ...args };
};

export default args;

args.withConfig = (config: any = {}) => (setup: Setup) => {
  const { $0, _, ...args } = yargs.config(config).parse(process.argv);
  setup.args = { _, ...args };
};

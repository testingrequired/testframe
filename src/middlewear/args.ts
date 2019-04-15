import yargs from "yargs";
import Setup from "../types/Setup";

export default (config: any = {}) => (setup: Setup) => {
  const { $0, _, ...args } = yargs.config(config).parse(process.argv);
  setup.args = { _, ...args };
};

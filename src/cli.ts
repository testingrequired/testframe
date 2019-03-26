const path = require("path");

export const run = (args: Array<string>) => {
  const cliFile = args[0];

  const run = require(path.join(process.cwd(), cliFile));

  run();
};

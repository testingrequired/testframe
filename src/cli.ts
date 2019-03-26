require = require("esm")(module /*, options*/);

const path = require("path");

export const run = () => {
  const cliFile = process.argv.slice(2)[0];

  const run = require(path.join(process.cwd(), cliFile)).default;

  run();
};

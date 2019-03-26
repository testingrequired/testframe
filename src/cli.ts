import path from "path";

export const run = () => {
  const cliFile = process.argv.slice(2)[0];

  if (!cliFile) {
    throw new Error("Must define cli file to use");
  }

  const { default: run } = require("esm")(module)(
    path.join(process.cwd(), cliFile)
  );

  run();
};

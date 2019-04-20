import path from "path";
import tf, { defaults } from "./index";

export const run = () => {
  const cliFilePath = process.argv.slice(2)[0];

  let run: any;

  if (cliFilePath) {
    run = require("esm")(module)(path.join(process.cwd(), cliFilePath)).default;
  } else {
    run = tf(defaults);
  }

  run();
};

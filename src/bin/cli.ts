import path from "path";
import tf, { defaults } from "../index";
import { specSyntax, matchTestFiles } from "../middlewear";

export const run = () => {
  require("yargs")
    .command(
      "*",
      "Run tests",
      () => {},
      tf(defaults, matchTestFiles("./**/*.test.js"), specSyntax)
    )
    .command(
      "custom [path]",
      "Run using custom cli",
      yargs => {
        yargs.positional("path", {
          describe: "Path to customized cli",
          default: "./bin/tf.js"
        });
      },
      argv => {
        const customPath = path.join(process.cwd(), argv.path);
        require("esm")(module)(customPath);
      }
    ).argv;
};

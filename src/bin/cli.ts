import path from "path";
import tf, { defaults } from "../index";
import { specSyntax, suiteSyntax, matchTestFiles } from "../middlewear";

const specCli = tf(
  defaults,
  matchTestFiles("./tests/**/*.spec.js"),
  specSyntax
);

const suiteCli = tf(
  defaults,
  matchTestFiles("./tests/**/*.spec.js"),
  specSyntax
);

export const run = () => {
  require("yargs")
    .command("spec", "Run spec style tests", () => {}, specCli)
    .command("suite", "Run test suite style tests", () => {}, suiteCli)
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
        require("esm")(module)(customPath).default();
      }
    ).argv;
};

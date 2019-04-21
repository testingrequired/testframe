import path from "path";
import tf, { defaults } from "../index";
import { specSyntax, suiteSyntax } from "../middlewear";

export const run = () => {
  require("yargs")
    .command(
      "spec",
      "Run spec style tests",
      () => {},
      () =>
        tf(
          (defaults as any).withOptions({
            testFilePatterns: ["./tests/**/*.spec.js"]
          }),
          specSyntax
        )()
    )
    .command(
      "suite",
      "Run test suite style tests",
      () => {},
      () =>
        tf(
          (defaults as any).withOptions({
            testFilePatterns: ["./tests/**/*.test.js"]
          }),
          suiteSyntax
        )()
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
        require("esm")(module)(customPath).default();
      }
    ).argv;
};

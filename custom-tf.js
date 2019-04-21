import tf, { defaults, specSyntax } from "./lib/index";

export default tf(
  defaults.withOptions({ testFilePatterns: ["./tests/**/*.spec.js"] }),
  specSyntax
);

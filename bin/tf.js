const { default: tf, run, middlewear } = require("../lib");

const { defaults, specSyntax, matchTestFiles, random, mock } = middlewear;

run(
  tf(defaults, matchTestFiles("./tests/**/*.spec.js"), specSyntax, random, mock)
);

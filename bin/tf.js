import { run, config, middlewear } from "../lib";

const { starter, specSyntax, matchTestFiles, random, mock } = middlewear;

run(
  config(
    starter,
    matchTestFiles("./tests/**/*.test.js"),
    specSyntax,
    random,
    mock
  )
);

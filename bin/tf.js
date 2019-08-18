import { pipeline, run, middlewear } from "../lib";

const { starter, specSyntax, matchTestFiles, random, mock } = middlewear;

run(
  pipeline(
    starter,
    matchTestFiles("./tests/**/*.test.js"),
    specSyntax,
    random,
    mock
  )
);

import { pipeline, run, middlewear } from "../lib";

const { defaults, specSyntax, matchTestFiles, random, mock } = middlewear;

run(
  pipeline(
    defaults,
    matchTestFiles("./tests/**/*.spec.js"),
    specSyntax,
    random,
    mock
  )
);

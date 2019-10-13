import { run, config, middleware } from "../lib";

const { starter, specSyntax, matchTestFiles, random, mock } = middleware;

run(
  config(
    starter,
    matchTestFiles("./tests/**/*.test.js"),
    specSyntax,
    random,
    mock
  )
);

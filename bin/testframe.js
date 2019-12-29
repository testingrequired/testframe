import { run, config, middleware } from "../lib";

const {
  starter,
  specSyntax,
  matchTestFiles,
  random,
  mock,
  fixture,
  data
} = middleware;

run(
  config(
    starter,
    matchTestFiles("./tests/**/*.test.js"),
    specSyntax,
    random,
    mock,
    fixture("testFixture", async () => "expected fixture value"),
    data
  )
);

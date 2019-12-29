import { run, config, middleware } from "../lib";

const {
  starter,
  specSyntax,
  matchTestFiles,
  random,
  mock,
  fixture
} = middleware;

run(
  config(
    starter,
    matchTestFiles("./tests/**/*.test.js"),
    specSyntax,
    random,
    mock,
    fixture("testFixture", () => "expected fixture value")
  )
);

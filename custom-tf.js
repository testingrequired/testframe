const {
  default: tf,
  run,
  defaults,
  specSyntax,
  suiteSyntax,
  matchTestFiles
} = require("./lib");

run(
  tf(defaults, matchTestFiles("./tests/**/*.spec.js"), specSyntax),
  tf(defaults, matchTestFiles("./tests/**/*.test.js"), suiteSyntax)
);

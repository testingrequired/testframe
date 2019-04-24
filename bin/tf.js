const {
  default: tf,
  run,
  defaults,
  specSyntax,
  matchTestFiles
} = require("../lib");

run(tf(defaults, matchTestFiles("./tests/**/*.spec.js"), specSyntax));

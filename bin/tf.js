const { default: tf, run, middlewear } = require("../lib");

const { defaults, specSyntax, matchTestFiles, random } = middlewear;

run(tf(defaults, matchTestFiles("./tests/**/*.spec.js"), specSyntax, random));

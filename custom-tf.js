import tf, { defaults, specSyntax, matchTestFiles } from "./lib/index";

export default tf(defaults, matchTestFiles("./tests/**/*.spec.js"), specSyntax);

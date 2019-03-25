import "@babel/polyfill";
import * as middlewear from "./middlewear/index";
import Middlewear from "./Middlewear";
import Setup from "./Setup";
import Results from "./Results";
import callWith from "./utils/callWith";

const tf = (...middlewears: Middlewear[]) => () => {
  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: [],
    skips: []
  };
  const results: Results = {};

  middlewears.forEach(callWith(setup, results));

  return results;
};

tf.middlewear = middlewear;

tf.compose = (runs: any[], ...middlewears: Middlewear[]) => () => {
  const results = runs.reduce((results, run) => ({ ...results, ...run() }), {});

  middlewears.forEach(callWith(null, results));

  return results;
};

export default tf;

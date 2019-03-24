import "@babel/polyfill";
import * as middlewear from "./middlewear/index";
import Middlewear from "./Middlewear";
import Setup from "./Setup";
import Results from "./Results";
import callWith from "./utils/callWith";

const tf = (...middlewears: Middlewear[]) => () => {
  const setup: Setup = { testFilePaths: [] };
  const results: Results = {};

  middlewears.forEach(callWith(setup, results));

  return results;
};

tf.middlewear = middlewear;

export default tf;

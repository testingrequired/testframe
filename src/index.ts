import "@babel/polyfill";
import Middlewear from "./Middlewear";
import * as middlewear from "./middlewear/index";
import Setup from "./Setup";
import Results from "./Results";

const tf = (...middlewears: Middlewear[]) => () => {
  const setup: Setup = { testFilePaths: [] };
  const results: Results = {};

  middlewears.forEach(callWith(setup, results));

  return results;
};

export default tf;

tf.middlewear = middlewear;

const callWith = (...args) => fn => fn(...args);

import "@babel/polyfill";
import Middlewear from "./Middlewear";
import * as middlewear from "./middlewear/index";

const tf = (...middlewears: Middlewear[]) => () => {
  const setup = { testFiles: new Map() };
  const results = {};

  middlewears.forEach(callWith(setup, results));

  return results;
};

export default tf;

tf.middlewear = middlewear;

const callWith = (...args) => fn => fn(...args);

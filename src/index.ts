import "@babel/polyfill";
import Middlewear from "./Middlewear";

export default (...middlewears: Middlewear[]) => () => {
  const setup = { testFiles: new Map() };
  const results = {};

  middlewears.forEach(callWith(setup, results));

  return results;
};

const callWith = (...args) => fn => fn(...args);

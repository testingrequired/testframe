import "@babel/polyfill";
import * as middlewear from "./middlewear/index";
import Middlewear from "./types/Middlewear";
import Setup from "./types/Setup";
import Results from "./types/Results";
import callWith from "./utils/callWith";
import { EventEmitter } from "events";

const tf = (...middlewears: Middlewear[]) => () => {
  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: []
  };
  const results: Results = [];

  const events = new EventEmitter();

  middlewears.forEach(callWith(setup, results, events));

  return results;
};

tf.middlewear = middlewear;

tf.compose = (runs: any[], ...middlewears: Middlewear[]) => () => {
  const results = runs.reduce((results, run) => ({ ...results, ...run() }), {});

  middlewears.forEach(callWith(null, results));

  return results;
};

export default tf;

export * from "./middlewear/index";

import "@babel/polyfill";
import * as middlewear from "./middlewear/index";
import Middlewear from "./types/Middlewear";
import Setup from "./types/Setup";
import Results from "./types/Results";
import callWith from "./utils/callWith";
import { EventEmitter } from "events";
import callMiddlewearExecutors from "./utils/callMiddlewearExecutors";

const tf = (...middlewears: Middlewear[]) => () => {
  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: []
  };
  const results: Results = [];

  const events = new EventEmitter();

  callMiddlewearExecutors(setup, results, events, ...middlewears);
};

tf.middlewear = middlewear;

export default tf;

export * from "./middlewear/index";

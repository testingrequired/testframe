import * as middlewear from "./middlewear/index";
import Middlewear from "./types/Middlewear";
import Setup from "./types/Setup";
import Results from "./types/Results";
import { EventEmitter } from "events";
import callWith from "./utils/callWith";

const tf = (...middlewears: Middlewear[]) => () => {
  const setup: Setup = {
    testFilePaths: [],
    globals: {},
    tests: [],
    args: {}
  };
  const results: Results = [];

  const events = new EventEmitter();

  const resultExecutors = middlewears.map(callWith(setup, events));

  events.emit("setup", setup);

  resultExecutors.forEach(fn => fn && fn(results));

  events.emit("results", results);
};

tf.middlewear = middlewear;

export default tf;

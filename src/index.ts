import "@babel/polyfill";
import "core-js/fn/array/flat-map";
import * as middlewear from "./middlewear/index";

export { default as pipeline } from "./pipeline";
export { default as run } from "./run";
export { middlewear };

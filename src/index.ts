import "@babel/polyfill";
import tf from "./tf";
import * as middlewear from "./middlewear/index";

export default tf;
export { default as run } from "./run";
export { middlewear };

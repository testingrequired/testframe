import callWith from "./utils/callWith";
import Middlewear from "./types/Middlewear";

type T = (...middlewears: Array<Middlewear>) => () => void;

const run = (...tfs: Array<T>) => tfs.forEach(callWith());

export default run;

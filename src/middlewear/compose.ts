import Setup from "../types/Setup";
import Results from "../types/Results";
import Middlewear from "../types/Middlewear";
import callWith from "../utils/callWith";

export default (...middlewears: Array<Middlewear>) => (
  setup: Setup,
  results: Results
) => {
  middlewears.forEach(callWith(setup, results));
};

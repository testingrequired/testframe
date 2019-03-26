import Setup from "../types/Setup";
import Results from "../types/Results";

export default (callback: any) => (setup: Setup, results: Results) => {
  callback(setup, results);
};

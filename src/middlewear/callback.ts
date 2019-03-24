import Setup from "../Setup";
import Results from "../Results";

export default (callback: any) => (setup: Setup, results: Results) => {
  callback(setup, results);
};

import glob from "glob";

import Setup from "../Setup";
import Results from "../Results";

export default (pattern: string) => (setup: Setup, results: Results) => {
  const paths = glob.sync(pattern, { absolute: true });

  paths.forEach(path => {
    setup.testFiles.set(path, require(path));
  });
};

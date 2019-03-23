import glob from "glob";

import Setup from "../Setup";

export default (pattern: string, cwd: string = process.cwd()) => (
  setup: Setup
) => {
  const paths = glob.sync(pattern, { cwd, absolute: true });

  paths.forEach(path => {
    setup.testFiles.set(path, require(path));
  });
};

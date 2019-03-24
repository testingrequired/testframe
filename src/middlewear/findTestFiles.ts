import glob from "glob";

import Setup from "../Setup";

export default (...patterns: Array<string>) => (setup: Setup) => {
  const paths = patterns.reduce(
    (paths, pattern) => [
      ...paths,
      ...glob.sync(pattern, { cwd: process.cwd(), absolute: true })
    ],
    []
  );

  paths.forEach(path => {
    setup.testFiles.set(path, require(path));
  });
};

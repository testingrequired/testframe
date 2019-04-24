import glob from "glob";
import path from "path";

import Setup from "../types/Setup";

export default (...patterns: Array<string>) => (setup: Setup) => {
  setup.testFilePaths = patterns
    .reduce(
      (paths, pattern) => [
        ...paths,
        ...glob.sync(pattern, {
          cwd: process.cwd(),
          absolute: true,
          ignore: ["./node_modules"]
        })
      ],
      []
    )
    .map(p => path.relative(process.cwd(), p));
};

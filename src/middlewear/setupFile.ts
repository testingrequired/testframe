import path from "path";

import Setup from "../Setup";

export default (filePath: string) => (setup: Setup) => {
  const requirePath = path.join(process.cwd(), filePath);

  const setupFile: (setup: Setup) => void = require(requirePath);

  setupFile(setup);
};

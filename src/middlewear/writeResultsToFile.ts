import fs from "fs";
import Setup from "../Setup";
import Results from "../Results";

export default filePath => (setup: Setup, results: Results) => {
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
};

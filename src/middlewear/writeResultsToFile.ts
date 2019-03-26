import fs from "fs";
import path from "path";
import Setup from "../types/Setup";
import Results from "../types/Results";

export default filePath => (setup: Setup, results: Results) => {
  const writePath = path.join(process.cwd(), filePath);
  fs.writeFileSync(writePath, JSON.stringify(results, null, 2));
};

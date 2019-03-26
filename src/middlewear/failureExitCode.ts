import Setup from "../types/Setup";
import Results from "../types/Results";
import Result from "../types/Result";

export default (exitCode: number = 1) => (setup: Setup, results: Results) => {
  Object.keys(results).forEach(testFilePath => {
    Object.keys(results[testFilePath]).forEach(testDescription => {
      const result: Result = results[testFilePath][testDescription];

      if (result.state !== "passed") process.exit(exitCode);
    });
  });
};

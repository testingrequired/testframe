import Setup from "../Setup";
import Results from "../Results";
import Result from "../Result";

export default (exitCode: number = 1) => (setup: Setup, results: Results) => {
  Object.keys(results).forEach(testFilePath => {
    Object.keys(results[testFilePath]).forEach(testDescription => {
      const result: Result = results[testFilePath][testDescription];

      if (result.state !== "passed") process.exit(exitCode);
    });
  });
};

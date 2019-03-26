import junit from "junit-report-builder";
import Setup from "../types/Setup";
import Results from "../types/Results";
import Result from "../types/Result";

export default filePath => (setup: Setup, results: Results) => {
  Object.keys(results).forEach(testFilePath => {
    const suite = junit.testSuite().name(testFilePath);

    Object.keys(results[testFilePath]).forEach(testDescription => {
      const testCase = suite.testCase().name(testDescription);

      const result: Result = results[testFilePath][testDescription];

      testCase.time(result.end.getTime() - result.start.getTime());

      switch (result.state) {
        case "failed":
          testCase.failure(result.error.message);
          testCase.stacktrace(result.error.stack);
          break;

        case "skipped":
          testCase.skipped();
          break;
      }
    });
  });

  junit.writeTo(filePath);
};

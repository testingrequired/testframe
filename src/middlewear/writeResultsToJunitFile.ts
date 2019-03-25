import junit from "junit-report-builder";
import Setup from "../Setup";
import Results from "../Results";
import Result from "../Result";

export default filePath => (setup: Setup, results: Results) => {
  Object.keys(results).forEach(testFilePath => {
    const suite = junit.testSuite().name(testFilePath);

    Object.keys(results[testFilePath]).forEach(testDescription => {
      const testCase = suite.testCase().name(testDescription);

      const result: Result = results[testFilePath][testDescription];

      testCase.time(result.start.getTime() - result.end.getTime());

      if (result.state !== "passed") {
        testCase.failure(result.error.message);
        testCase.stacktrace(result.error.stack);
      }
    });

    setup.skips
      .filter(
        ({ testFilePath: skippedTestFilePath }) =>
          skippedTestFilePath === testFilePath
      )
      .forEach(({ description }) =>
        suite
          .testCase()
          .name(description)
          .skipped()
      );
  });

  junit.writeTo(filePath);
};

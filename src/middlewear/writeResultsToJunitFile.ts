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

      if (result.state !== "passed") {
        testCase.failure(result.error.message);
        testCase.stacktrace(result.error.stack);
      }
    });

    setup.skips
      .filter(([skippedTestFilePath]) => skippedTestFilePath === testFilePath)
      .forEach(([_, description, __]) =>
        suite
          .testCase()
          .name(description)
          .skipped()
      );
  });

  junit.writeTo(filePath);
};

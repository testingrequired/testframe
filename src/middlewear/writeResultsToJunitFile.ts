import junit from "junit-report-builder";
import Setup from "../Setup";
import Results from "../Results";

export default filePath => (setup: Setup, results: Results) => {
  Object.keys(results).forEach(testFilePath => {
    const suite = junit.testSuite().name(testFilePath);

    Object.keys(results[testFilePath]).forEach(testDescription => {
      const testCase = suite.testCase().name(testDescription);

      const result = results[testFilePath][testDescription];

      if (result !== true) {
        testCase.failure(result.message);
        testCase.stacktrace(result.stack);
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

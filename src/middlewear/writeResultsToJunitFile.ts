import junit from "junit-report-builder";
import Setup from "../types/Setup";
import Results from "../types/Results";
export default (filePath: string) => (setup: Setup, results: Results) => {
  const suites = {};

  results.forEach(result => {
    const [testFilePath, testDescription] = result.description;

    let suite;

    if (suites[testFilePath]) {
      suite = suites[testFilePath];
    } else {
      suite = junit.testSuite().name(testFilePath);
      suites[testFilePath] = suite;
    }

    const testCase = suite.testCase().name(testDescription);
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

    junit.writeTo(filePath);
  });
};

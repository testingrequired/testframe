import junit from "junit-report-builder";
import Setup from "../types/Setup";
import Results from "../types/Results";

export default (filePath: string) => (setup: Setup) => (results: Results) => {
  const suites: Record<string, any> = {};

  results.forEach(result => {
    const { testFilePath, description } = result;

    let suite;

    if (suites[testFilePath]) {
      suite = suites[testFilePath];
    } else {
      suite = junit.testSuite().name(testFilePath);
      suites[testFilePath] = suite;
    }

    const testCase = suite.testCase().name(description);
    testCase.time(result.time);

    switch (result.state) {
      case "failed":
        testCase.failure(result.error && result.error.message);
        testCase.stacktrace(result.error && result.error.stack);
        break;

      case "skipped":
        testCase.skipped();
        break;
    }
  });

  junit.writeTo(filePath);
};

import junit from "junit-report-builder";
import Setup from "../Setup";
import Results from "../Results";

export default filePath => (setup: Setup, results: Results) => {
  Object.keys(results).forEach(key => {
    const suite = junit.testSuite().name(key);

    Object.keys(results[key]).forEach(key2 => {
      const testCase = suite.testCase().name(key2);

      if (results[key][key2] !== true) {
        testCase.failure(results[key][key2]);
      }
    });
  });

  junit.writeTo(filePath);
};

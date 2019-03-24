import Setup from "../Setup";
import Results from "../Results";

export default function runTests(setup: Setup, results: Results) {
  const { testFiles } = setup;

  testFiles.forEach((module, testFilePath) => {
    results[testFilePath] = {};

    Object.entries(module).forEach(([key, value]) => {
      let result;
      try {
        value();
        result = true;
      } catch (e) {
        result = e;
      } finally {
        results[testFilePath][key] = result;
      }
    });
  });
}

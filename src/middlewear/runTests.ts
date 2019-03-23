import Setup from "../Setup";
import Results from "../Results";

export default function runTests(setup: Setup, results: Results) {
  const { testFiles } = setup;

  debugger;

  testFiles.forEach((module, testFilePath) => {
    results[testFilePath] = {};

    debugger;

    Object.entries(module).forEach(([key, value]) => {
      debugger;

      results[testFilePath][key] = value();
    });
  });
}

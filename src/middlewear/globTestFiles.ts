import Setup from "../Setup";
import Results from "../Results";

export default async (setup: Setup, results: Results) => {
  setup.testFiles.set(
    "../../tests/example.test.js",
    require("../../tests/example.test.js")
  );
};

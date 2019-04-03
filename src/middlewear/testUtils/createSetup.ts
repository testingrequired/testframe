import Setup from "../../types/Setup";
import Test from "../../types/Test";

export default (tests: Array<Test> = []): Setup => ({
  testFilePaths: [],
  components: {},
  tests
});

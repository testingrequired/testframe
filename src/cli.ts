import tf from "./index";
import globTestFiles from "./middlewear/globTestFiles";
import runTests from "./middlewear/runTests";
import printResults from "./middlewear/printResults";

tf(globTestFiles, runTests, printResults);

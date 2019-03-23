import tf from "./index";
import globTestFiles from "./middlewear/globTestFiles";
import runFlatTests from "./middlewear/runFlatTests";
import printResultsToConsole from "./middlewear/printResultsToConsole";

tf(globTestFiles("./tests/*.test.js"), runFlatTests, printResultsToConsole);

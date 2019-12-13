import Setup from "../types/Setup";
import Results from "../types/Results";
import Result, { ResultStates } from "../types/Result";

export default (setup: Setup) => {
  return (results: Results) => {
    const { tests, globals } = setup;
    const globalReplacements = new Map();

    tests.forEach(test => {
      const { testFilePath, description, fn: testFn, runState } = test;
      const start = new Date(Date.now());

      let state: ResultStates;
      let error: Error | undefined;

      setup.events.emit("test:start", test);

      switch (runState) {
        case "run":
          try {
            createGlobals(globals, globalReplacements);
            testFn.call(null);
            state = "passed";
          } catch (e) {
            state = setup.assertionErrorsTypes.find(
              assertionErrorsType => e instanceof assertionErrorsType
            )
              ? "failed"
              : "errored";
            error = e;
          } finally {
            removeGlobals(globals, globalReplacements);
          }
          break;

        case "skip":
          state = "skipped";
          break;

        case "todo":
          state = "todo";
          break;

        default:
          throw new Error(`Invalid test run state: ${runState}`);
      }

      const result: Result = {
        state,
        start,
        error,
        end: new Date(Date.now()),
        testFilePath,
        description,
        get time() {
          return this.end.getTime() - this.start.getTime();
        }
      };

      setup.events.emit("test:result", result);

      switch (state) {
        case "failed":
          setup.events.emit("test:failure", result);
          break;
        case "errored":
          setup.events.emit("test:error", result);
          break;
        case "skipped":
          setup.events.emit("test:skip", result);
          break;
        case "todo":
          setup.events.emit("test:todo", result);
          break;
      }

      results.push(result);
    });

    setup.events.emit("results", results);
  };
};

function createGlobals(
  globals: Record<string, any>,
  globalReplacements: Map<string, any>
) {
  Object.entries(globals).forEach(i => {
    const [key, value] = i;

    if (global.hasOwnProperty(key)) {
      globalReplacements.set(key, (global as any)[key]);
    }

    (global as any)[key] = value;
  });
}

function removeGlobals(
  globals: Record<string, any>,
  globalReplacements: Map<string, any>
) {
  Object.entries(globals).forEach(([key]) => {
    if (globalReplacements.has(key)) {
      (global as any)[key] = globalReplacements.get(key);
    } else {
      delete (global as any)[key];
    }
  });
}

import Setup from "../types/Setup";
import Results from "../types/Results";
import Middleware, { ResultsExecutor } from "../types/Middleware";

export default (...middlewares: Array<Middleware>) => async (setup: Setup) => {
  const resultExecutors: Array<ResultsExecutor> = [];

  for (const middleware of middlewares) {
    const newLocal = await middleware(setup);

    if (newLocal) {
      resultExecutors.push(newLocal);
    }
  }

  return async (results: Results) => {
    for (const resultExector of resultExecutors) {
      await resultExector(results);
    }
  };
};

import Setup from "../types/Setup";
import Results from "../types/Results";
import Middleware, { ResultsExecutor } from "../types/Middleware";

export default (...middlewares: Array<Middleware>) => async (setup: Setup) => {
  const resultExecutors: Array<ResultsExecutor> = [];

  for (const middleware of middlewares) {
    const resultExecutor = await middleware(setup);

    if (resultExecutor) {
      resultExecutors.push(resultExecutor);
    }
  }

  return async (results: Results) => {
    for (const resultExector of resultExecutors) {
      await resultExector(results);
    }
  };
};

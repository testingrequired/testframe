import Setup from "../types/Setup";
import Results from "../types/Results";
import Middleware from "../types/Middleware";
import notEmpty from "../utils/notEmpty";

export default (...middlewares: Array<Middleware>) => async (setup: Setup) => {
  const resultExecutors = (
    await Promise.all(
      middlewares.map(middlewareSetup => middlewareSetup(setup))
    )
  ).filter(notEmpty);

  return async (results: Results) => {
    await Promise.all(
      resultExecutors.map(middlewareResults => middlewareResults(results))
    );
  };
};

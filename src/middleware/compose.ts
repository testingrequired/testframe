import Setup from "../types/Setup";
import Results from "../types/Results";
import Middleware from "../types/Middleware";
import notEmpty from "../utils/notEmpty";

export default (...middlewares: Array<Middleware>) => (
  setup: Setup
) => {
  const resultExecutors = middlewares.map(setupPhase =>
    setupPhase(setup)
  );

  return (results: Results) =>
    resultExecutors.filter(notEmpty).map(resultsPhase => resultsPhase(results));
};

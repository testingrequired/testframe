import Setup from "../types/Setup";
import Constructor from "../types/Constructor";

export default (assertionErrorType: Constructor<Error>) => (setup: Setup) => {
  setup.assertionErrorsTypes.push(assertionErrorType);
};

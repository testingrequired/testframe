import assert, { AssertionError } from "assert";
import compose from "./compose";
import registerAssertionErrorType from "./registerAssertionErrorType";
import globals from "./globals";

export default compose(
  registerAssertionErrorType(AssertionError),
  globals("assert", assert)
);

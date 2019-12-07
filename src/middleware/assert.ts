import assert, { AssertionError } from "assert";
import globals from "./globals";
import Setup from "../types/Setup";

export default (setup: Setup) => {
  setup.assertionErrorsTypes.push(AssertionError);
  return globals("assert", assert)(setup);
};

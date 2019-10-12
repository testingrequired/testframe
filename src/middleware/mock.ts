import testdouble from "testdouble";
import globals from "./globals";
import Setup from "../types/Setup";

export default (setup: Setup) => {
  globals("mock", testdouble)(setup);
  globals("when", testdouble.when)(setup);
  globals("verify", testdouble.verify)(setup);
  globals("replace", testdouble.replace)(setup);
};

import testdouble from "testdouble";
import globals from "./globals";
import compose from "./compose";

export default compose(
  globals("mock", testdouble),
  globals("when", testdouble.when),
  globals("verify", testdouble.verify),
  globals("replace", testdouble.replace)
);

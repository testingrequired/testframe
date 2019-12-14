//@ts-ignore
import multiassert, { assert } from "@testingrequired/multiassert";
import globals from "./globals";

multiassert.assert = assert;

export default globals("multiassert", multiassert);

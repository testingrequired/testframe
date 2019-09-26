import multiassert, { assert } from "@testingrequired/multiassert";
import globals from "./globals";
import Setup from "../types/Setup";

multiassert.assert = assert;

export default (setup: Setup) => globals("multiassert", multiassert)(setup);

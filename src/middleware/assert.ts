import assert from "assert";
import globals from "./globals";
import Setup from "../types/Setup";

export default (setup: Setup) => globals("assert", assert)(setup);

import Setup from "../types/Setup";
import globals from "./globals";

export default (setup: Setup) => globals("fixtures", setup.fixtures)(setup);

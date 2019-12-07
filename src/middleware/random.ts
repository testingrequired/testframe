//@ts-ignore
import Chance from "chance";
import globals from "./globals";
import Setup from "../types/Setup";

export default (setup: Setup) => {
  const { seed } = setup.args;
  const random = seed ? new Chance(seed) : new Chance();
  globals("random", random)(setup);
};

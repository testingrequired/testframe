import randomMiddlewear from "./random";
import Setup from "../types/Setup";
import Chance from "chance";
import createSetup from "./testUtils/createSetup";

describe("random", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    randomMiddlewear(setup);

    expect(setup.globals.random).toBeInstanceOf(Chance);
  });
});

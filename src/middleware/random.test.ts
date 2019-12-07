import randomMiddleware from "./random";
import Setup from "../types/Setup";
//@ts-ignore
import Chance from "chance";
import createSetup from "./testUtils/createSetup";

describe("random", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    randomMiddleware(setup);

    expect(setup.globals.random).toBeInstanceOf(Chance);
  });
});

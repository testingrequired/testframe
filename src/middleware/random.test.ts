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

  describe("with seed", () => {
    const expectedSeed = "testSeed";

    beforeEach(() => {
      setup.args.seed = expectedSeed;
    });

    it("should pass seed", () => {
      randomMiddleware(setup);

      expect(setup.globals.random).toBeInstanceOf(Chance);

      // This is the seed random assigns the expectedSeed
      // There isn't a way to get the original passed seed
      expect(setup.globals.random.seed).toBe(13936763416);
    });
  });
});

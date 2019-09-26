import multiassertMiddlewear from "./multiassert";
import Setup from "../types/Setup";
import multiassert from "@testingrequired/multiassert";
import createSetup from "./testUtils/createSetup";

describe("multiassert", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    multiassertMiddlewear(setup);

    expect(setup.globals.multiassert).toBe(multiassert);
  });
});

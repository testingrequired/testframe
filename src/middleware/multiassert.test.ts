import multiassertMiddleware from "./multiassert";
import Setup from "../types/Setup";
//@ts-ignore
import multiassert from "@testingrequired/multiassert";
import createSetup from "./testUtils/createSetup";

describe("multiassert", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    multiassertMiddleware(setup);

    expect(setup.globals.multiassert).toBe(multiassert);
  });
});

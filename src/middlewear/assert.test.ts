import assertMiddlewear from "./assert";
import Setup from "../types/Setup";
import assert from "assert";
import createSetup from "./testUtils/createSetup";

describe("assert", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", () => {
    assertMiddlewear(setup);

    expect(setup.globals.assert).toBe(assert);
  });
});

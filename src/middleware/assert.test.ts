import assertMiddleware from "./assert";
import Setup from "../types/Setup";
import assert from "assert";
import createSetup from "./testUtils/createSetup";

describe("assert", () => {
  let setup: Setup;

  beforeEach(() => {
    setup = createSetup();
  });

  it("should create globals", async () => {
    await assertMiddleware(setup);

    expect(setup.globals.assert).toBe(assert);
  });
});

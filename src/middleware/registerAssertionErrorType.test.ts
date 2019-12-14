import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";
import registerAssertionErrorType from "./registerAssertionErrorType";

describe("registerAssertionErrorType", () => {
  let setup: Setup;

  class CustomError extends Error {}

  beforeEach(() => {
    setup = createSetup();

    registerAssertionErrorType(CustomError)(setup);
  });

  it("should push assertion error type in to setup", () => {
    expect(setup.assertionErrorsTypes.includes(CustomError)).toBe(true);
  });
});

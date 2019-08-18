import randomize from "./randomize";
import Setup from "../types/Setup";
import createTest from "./testUtils/createTest";
import createSetup from "./testUtils/createSetup";

describe("randomize", () => {
  const expectedTests = [createTest("1"), createTest("2"), createTest("3")];

  const setup: Setup = createSetup(expectedTests);

  it.skip("should randomize test order", () => {
    randomize(setup);
    expect(setup.tests).not.toEqual(expectedTests);
  });

  it("should be same length", () => {
    randomize(setup);
    expect(setup.tests.length).toBe(expectedTests.length);
  });

  it("should contain the same items", () => {
    randomize(setup);

    const sortedSetupTests = setup.tests.map(a => a.description).sort();
    const sortedExpectedTests = expectedTests.map(a => a.description).sort();

    expect(sortedSetupTests).toEqual(sortedExpectedTests);
  });
});

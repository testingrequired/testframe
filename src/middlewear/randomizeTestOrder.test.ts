import randomizeTestOrder from "./randomizeTestOrder";
import Setup from "../types/Setup";
import Test from "../types/Test";
import createTest from "./testUtils/createTest";
import createSetup from "./testUtils/createSetup";

describe("randomTestOrder", () => {
  const expectedTest: Test = createTest("1");

  const expectedTest2: Test = createTest("2");

  const expectedTest3: Test = createTest("3");

  const expectedTests = [expectedTest, expectedTest2, expectedTest3];

  const setup: Setup = createSetup(expectedTests);

  it.skip("should random test order", () => {
    randomizeTestOrder(setup);
    expect(setup.tests).not.toEqual(expectedTests);
  });

  it("should be same length", () => {
    randomizeTestOrder(setup);
    expect(setup.tests.length).toBe(expectedTests.length);
  });

  it("should contain the same items", () => {
    randomizeTestOrder(setup);

    const sortedSetupTests = setup.tests.map(a => a.description).sort();
    const sortedExpectedTests = expectedTests.map(a => a.description).sort();

    expect(sortedSetupTests).toEqual(sortedExpectedTests);
  });
});

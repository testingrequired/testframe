import randomizeTestOrder from "./randomizeTestOrder";
import Setup from "../types/Setup";
import Test from "../types/Test";

describe("randomTestOrder", () => {
  const expectedTest: Test = {
    testFilePath: "test file path 1",
    description: "description 1",
    runState: "run",
    fn: jest.fn()
  };

  const expectedTest2: Test = {
    testFilePath: "test file path 2",
    description: "description 2",
    runState: "run",
    fn: jest.fn()
  };

  const expectedTest3: Test = {
    testFilePath: "test file path 3",
    description: "description 3",
    runState: "run",
    fn: jest.fn()
  };

  const expectedTests = [expectedTest, expectedTest2, expectedTest3];

  const setup: Setup = {
    testFilePaths: [],
    components: {},
    tests: expectedTests
  };

  it("should random test order", () => {
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

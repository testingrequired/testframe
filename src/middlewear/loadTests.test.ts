import loadTests from "./loadTests";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("loadTests", () => {
  let setup: Setup;
  let beforeEachMockFn;
  let testMockFn;

  beforeEach(() => {
    beforeEachMockFn = jest.fn();
    (global as any).beforeEachMock = beforeEachMockFn;

    testMockFn = jest.fn();
    (global as any).testMock = testMockFn;

    setup = createSetup();
    setup.testFilePaths = ["./src/middlewear/testUtils/exampleTest.js"];
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("should load two tests", () => {
    loadTests(setup);

    expect(setup.tests.length).toBe(2);
  });

  it("should load run test", () => {
    loadTests(setup);

    expect(setup.tests[0].description).toBe("test1");
    expect(setup.tests[0].runState).toBe("run");
    setup.tests[0].fn(setup.components);
    expect(beforeEachMockFn).toHaveBeenNthCalledWith(1);
    expect(testMockFn).toHaveBeenNthCalledWith(1, setup.components);
  });

  it("should load skipped test", () => {
    loadTests(setup);

    expect(setup.tests[1].description).toBe("test2");
    expect(setup.tests[1].runState).toBe("skip");
    setup.tests[1].fn(setup.components);
  });
});

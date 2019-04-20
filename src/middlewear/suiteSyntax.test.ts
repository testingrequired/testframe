import specSyntax from "./specSyntax";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("loadTests", () => {
  let setup: Setup;
  let beforeEachMockFn;
  let afterEachMockFn;
  let testMockFn;

  beforeEach(() => {
    beforeEachMockFn = jest.fn();
    (global as any).beforeEachMock = beforeEachMockFn;

    afterEachMockFn = jest.fn();
    (global as any).afterEachMock = afterEachMockFn;

    testMockFn = jest.fn();
    (global as any).testMock = testMockFn;

    setup = createSetup();
    setup.testFilePaths = [
      "./src/middlewear/testUtils/exampleTests/suite/exampleTest.js"
    ];
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("should load one test", () => {
    specSyntax(setup);

    expect(setup.tests.length).toBe(1);
  });

  it("should load run test", () => {
    specSyntax(setup);

    expect(setup.tests[0].description).toBe("test1");
    expect(setup.tests[0].runState).toBe("run");
    setup.tests[0].fn();
    expect(beforeEachMockFn).toHaveBeenNthCalledWith(1);
    expect(testMockFn).toHaveBeenNthCalledWith(1);
    expect(afterEachMockFn).toHaveBeenNthCalledWith(1);
  });

  it("should run hooks for each test", () => {
    specSyntax(setup);

    setup.tests[0].fn();

    expect(beforeEachMockFn).toBeCalledTimes(1);
    expect(afterEachMockFn).toBeCalledTimes(1);
  });
});

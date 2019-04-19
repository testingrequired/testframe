import specSyntax from "./specSyntax";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe.skip("loadTests", () => {
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
    setup.testFilePaths = ["./src/middlewear/testUtils/exampleTest.js"];
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("should load two tests", () => {
    specSyntax(setup);

    expect(setup.tests.length).toBe(2);
  });

  it("should load run test", () => {
    specSyntax(setup);

    expect(setup.tests[0].description).toBe("test1");
    expect(setup.tests[0].runState).toBe("run");
    setup.tests[0].fn(setup.components);
    expect(beforeEachMockFn).toHaveBeenNthCalledWith(1);
    expect(testMockFn).toHaveBeenNthCalledWith(1, setup.components);
    expect(afterEachMockFn).toHaveBeenNthCalledWith(1);
  });

  it("should load skipped test", () => {
    specSyntax(setup);

    expect(setup.tests[1].description).toBe("test2");
    expect(setup.tests[1].runState).toBe("skip");
    setup.tests[1].fn(setup.components);
    expect(beforeEachMockFn).not.toBeCalled();
    expect(testMockFn).not.toBeCalled();
    expect(afterEachMockFn).not.toBeCalled();
  });

  it("should run hooks for each test", () => {
    specSyntax(setup);

    setup.tests[0].fn(setup.components);
    setup.tests[1].fn(setup.components);

    expect(beforeEachMockFn).not.toBeCalledTimes(2);
    expect(afterEachMockFn).not.toBeCalledTimes(2);
  });
});

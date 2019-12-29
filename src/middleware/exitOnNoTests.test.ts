import exitOnNoTests from "./exitOnNoTests";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";
import createTest from "./testUtils/createTest";

describe("exitOnNoTests", () => {
  let setup: Setup;

  const expectedExitCode = 3;

  let spy: any;

  beforeEach(() => {
    setup = createSetup();

    spy = jest.fn();
    setup.events.on("exit", spy);
  });

  describe("when no are defined tests", () => {
    it("should exit", () => {
      exitOnNoTests(setup);
      setup.events.emit("setup", setup);
      expect(spy).toBeCalledWith(expectedExitCode);
    });
  });

  describe("when there are defined tests", () => {
    it("should exit", () => {
      exitOnNoTests(setup);
      setup.tests.push(createTest("test1"));
      setup.events.emit("setup", setup);
      expect(spy).not.toBeCalled();
    });
  });
});

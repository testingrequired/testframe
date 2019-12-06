import exitOnNoTests from "./exitOnNoTests";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("exitOnNoTests", () => {
  let setup: Setup;

  const expectedExitCode = 1;

  let oldExit;

  beforeEach(() => {
    oldExit = process.exit;
    (process.exit as any) = jest.fn();

    setup = createSetup();
  });

  afterEach(() => {
    process.exit = oldExit;
  });

  describe("when no are defined tests", () => {
    it("should exit", () => {
      exitOnNoTests(setup);
      setup.events.emit("setup", setup);
      expect(process.exit).toBeCalledWith(expectedExitCode);
    });
  });
});

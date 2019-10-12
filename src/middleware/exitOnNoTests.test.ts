import exitOnNoTests from "./exitOnNoTests";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";
import { EventEmitter } from "events";

describe("exitOnNoTests", () => {
  let setup: Setup;
  const events = new EventEmitter();

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
      exitOnNoTests(setup, events);
      events.emit("setup", setup);
      expect(process.exit).toBeCalledWith(expectedExitCode);
    });
  });
});

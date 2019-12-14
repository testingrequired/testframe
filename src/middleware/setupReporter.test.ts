import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";
import { setupReporter } from ".";

describe("setupReporter", () => {
  let setup: Setup;
  let consoleMock: jest.SpyInstance;

  beforeEach(() => {
    setup = createSetup();
    setup.args.foo = "bar";
    setup.globals.global1 = jest.fn();
    setup.globals.global2 = jest.fn();
    setup.testFilePaths.push("test/file/path1");
    setup.testFilePaths.push("test/file/path2");
    consoleMock = jest.spyOn(console, "log");
  });

  afterEach(() => {
    consoleMock.mockReset();
  });

  it("should work", () => {
    setupReporter(setup);
    setup.events.emit("setup", setup);
    expect(consoleMock.mock.calls.length).toBe(4);
    expect(consoleMock.mock.calls[0]).toEqual(["testframe\n"]);
    expect(consoleMock.mock.calls[1]).toEqual([`Args: {"foo":"bar"}\n`]);
    expect(consoleMock.mock.calls[2]).toEqual([
      "Test Globals: global1, global2\n"
    ]);
    expect(consoleMock.mock.calls[3]).toEqual([
      "Test File Paths: test/file/path1, test/file/path2\n"
    ]);
  });
});

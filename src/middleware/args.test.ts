import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";
import args from "../middleware/args";

describe("args", () => {
  const setup: Setup = createSetup();
  let previousProcessArgv: any;
  let expectedArgs;

  beforeEach(() => {
    previousProcessArgv = process.argv;
    expectedArgs = ["--foo=bar"];
    process.argv = expectedArgs;
  });

  afterEach(() => {
    process.argv = previousProcessArgv;
    previousProcessArgv = null;
  });

  it("should return positional and named arguments", () => {
    args(setup);
    expect(setup.args).toEqual({ _: [], foo: "bar" });
  });
});

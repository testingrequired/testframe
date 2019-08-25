import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";
import args from "./args";
import yargs from "yargs";

jest.mock("yargs", () => {
  const mock: any = jest.fn();
  mock.parse = jest.fn(() => ({ _: [] }));
  mock.config = jest.fn(() => mock);
  return mock;
});

describe("args", () => {
  const setup: Setup = createSetup();

  it("should pass config to yargs", () => {
    args.withConfig({})(setup);
    expect(yargs.config).toHaveBeenCalledWith({});
  });

  it("should pass default config to yargs", () => {
    args.withConfig()(setup);
    expect(yargs.config).toHaveBeenCalledWith({});
  });
});

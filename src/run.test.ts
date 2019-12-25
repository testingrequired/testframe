import run from "./run";

describe("run", () => {
  let oldExit: any;
  let configs: Array<() => void>;
  let configA: jest.Mock;
  let configB: jest.Mock;

  beforeEach(() => {
    oldExit = process.exit;
    (process.exit as any) = jest.fn();

    configA = jest.fn();
    configB = jest.fn();

    configs = [configA, configB];
  });

  afterEach(() => {
    process.exit = oldExit;
  });

  it("should call each function in array", async () => {
    await run(...configs);
    expect(configA).toHaveBeenNthCalledWith(1);
    expect(configB).toHaveBeenNthCalledWith(1);
  });

  it("should exit with 0", async () => {
    await run(...configs);
    expect(process.exit).toHaveBeenCalledWith(0);
  });
});

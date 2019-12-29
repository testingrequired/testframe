import run from "./run";

describe("run", () => {
  let oldExit: any;
  let configs: Array<() => Promise<number>>;
  let configA: jest.Mock;
  let configB: jest.Mock;

  beforeEach(() => {
    oldExit = process.exit;
    (process.exit as any) = jest.fn();

    configA = jest.fn(async () => 0);
    configB = jest.fn(async () => 0);

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

  describe("exit codes", () => {
    beforeEach(() => {
      configs = [jest.fn(async () => 3), jest.fn(async () => 2)];
    });

    it("should exit with lowest non zero exit code", async () => {
      await run(...configs);
      expect(process.exit).toHaveBeenCalledWith(2);
    });
  });
});

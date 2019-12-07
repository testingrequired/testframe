import callWith from "./callWith";

describe("callWith", () => {
  let spy: Function;

  beforeEach(() => {
    spy = jest.fn();
  });

  it("should call fn with args", () => {
    callWith(1, 2, 3)(spy);
    expect(spy).toBeCalledWith(1, 2, 3);
  });
});

import call from "./call";

describe("callWith", () => {
  let spy;

  beforeEach(() => {
    spy = jest.fn();
  });

  it("should call fn with args", () => {
    call(spy);
    expect(spy).toBeCalled();
  });
});

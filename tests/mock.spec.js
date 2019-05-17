let mockFn;

beforeEach(() => {
  mockFn = mock.func();
});

afterEach(() => {
  mock.reset();
});

describe("mock function", () => {
  beforeEach(() => mockFn());

  it("should be called", () => mock.verify(mockFn()));
});

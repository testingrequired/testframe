const testdouble = require("testdouble");

test("should have mock available", () => {
  assert(mock === testdouble);
});

test("should verify mock functions", () => {
  const mockFunction = mock.func();

  mockFunction("foo");

  mock.verify(mockFunction("foo"));
});

describe("mock", () => {
  it("should work", () => {
    const mockFn = mock.func();

    when(mockFn(5)).thenReturn(10);

    function testFn() {
      return mockFn(5);
    }

    const result = testFn();

    verify(mockFn(5));
    assert.strictEqual(result, 10);
  });
});

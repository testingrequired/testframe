describe("mock", () => {
  it("should work", () => {
    const mockFn = mock.func();
    const expectedInput = Symbol();
    const expectedOutput = Symbol();

    when(mockFn(expectedInput)).thenReturn(expectedOutput);

    function testFn() {
      return mockFn(expectedInput);
    }

    assert.strictEqual(testFn(), expectedOutput);
    verify(mockFn(expectedInput));
  });
});

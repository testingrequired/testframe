describe("skip", () => {
  it.skip("test 1", testMock);

  describe.skip("skipped describe", () => {
    it("test 2", testMock);
  });
});

describe("describe 1", () => {
  beforeEach(beforeEachMock);

  it("test 1", testMock);

  describe("describe 2", () => {
    beforeEach(beforeEachMock);

    beforeEach(beforeEachMock);

    it("test 2", testMock);
  });

  it("test 3", testMock);
});

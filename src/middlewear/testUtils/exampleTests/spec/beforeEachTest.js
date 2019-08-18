describe("describe 1", () => {
  beforeEach(beforeEachMock);

  it("test 1", testMock);

  describe("describe 2", () => {
    beforeEach(beforeEachMock);

    it("test 2", testMock);
  });

  describe("describe 3", () => {
    beforeEach(beforeEachMock);

    it("test 3", testMock);

    describe("describe 4", () => {
      beforeEach(beforeEachMock);

      it("test 4", testMock);
    });
  });
});

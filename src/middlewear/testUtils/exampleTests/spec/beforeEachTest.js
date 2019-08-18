describe("beforeEach", () => {
  beforeEach(beforeEachMock);

  it("should initialize value", testMock);

  describe("increment", () => {
    beforeEach(beforeEachMock);

    it("should increment value", testMock);
  });

  describe("decrement", () => {
    beforeEach(beforeEachMock);

    it("should decrement value", testMock);

    describe("again", () => {
      beforeEach(beforeEachMock);

      it("should decrement value further", testMock);
    });
  });
});

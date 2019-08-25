/* istanbul ignore file */
describe("describe 1", () => {
  afterEach(afterEachMock);

  it("test 1", testMock);

  describe("describe 2", () => {
    afterEach(afterEachMock);

    it("test 2", testMock);
  });

  describe("describe 3", () => {
    afterEach(afterEachMock);

    it("test 3", testMock);

    describe("describe 4", () => {
      afterEach(afterEachMock);

      it("test 4", testMock);
    });
  });
});
